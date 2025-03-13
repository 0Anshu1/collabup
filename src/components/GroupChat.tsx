import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, Send, Users, Reply, Upload } from 'lucide-react';
import io, { Socket } from 'socket.io-client';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
  reactions?: {
    [key: string]: string[];
  };
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
  status?: 'sent' | 'delivered' | 'read';
}

interface Member {
  id: string;
  name: string;
  status: 'online' | 'offline';
  avatar?: string;
  isTyping?: boolean;
}

interface GroupChatProps {
  group: {
    id: string;
    name: string;
    topic: string;
    members: number;
  };
  onClose: () => void;
}

const SOCKET_URL = 'http://localhost:5050';

const GroupChat: React.FC<GroupChatProps> = ({ group, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!user) return;

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('joinGroup', { groupId: group.id, userId: user.id });
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    fetchMessages();
    fetchMembers();

    newSocket.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
      // Send read receipt
      if (user?.id !== message.senderId) {
        newSocket.emit('messageRead', { groupId: group.id, messageId: message.id });
      }
    });

    newSocket.on('messageStatus', ({ messageId, status, userId }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    });

    newSocket.on('userTyping', ({ userId, userName }) => {
      setTypingUsers(prev => [...new Set([...prev, userName])]);
    });

    newSocket.on('userStoppedTyping', ({ userId, userName }) => {
      setTypingUsers(prev => prev.filter(name => name !== userName));
    });

    newSocket.on('memberUpdate', (updatedMembers: Member[]) => {
      setMembers(updatedMembers);
    });

    return () => {
      newSocket.emit('leaveGroup', { groupId: group.id, userId: user?.id });
      newSocket.disconnect();
    };
  }, [group.id, user?.id]);

  const handleTyping = () => {
    if (!socket || !user) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { groupId: group.id, userId: user.id, userName: user.fullName });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stopTyping', { groupId: group.id, userId: user.id, userName: user.fullName });
    }, 2000);
  };

  const handleFileUpload = async (files: FileList) => {
    if (!socket || !user) return;

    const file = files[0];
    if (!file) return;

    // TODO: Implement file upload to server
    const attachment = {
      type: file.type.startsWith('image/') ? 'image' as const : 'file' as const,
      url: URL.createObjectURL(file),
      name: file.name
    };

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      content: '',
      timestamp: new Date(),
      attachments: [attachment],
      status: 'sent'
    };

    socket.emit('sendMessage', { groupId: group.id, message });
    setMessages(prev => [...prev, message]);
  };

  const handleReaction = (messageId: string, reaction: string) => {
    if (!socket || !user) return;

    socket.emit('addReaction', { groupId: group.id, messageId, userId: user.id, reaction });
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [reaction]: [...(msg.reactions?.[reaction] || []), user.id]
              }
            }
          : msg
      )
    );
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/api/groups/${group.id}/messages`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/api/groups/${group.id}/members`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !socket) {
      console.error('Cannot send message: missing user, socket, or empty message');
      return;
    }

    if (!socket.connected) {
      console.error('Socket is not connected');
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      content: newMessage.trim(),
      timestamp: new Date(),
      ...(replyingTo && {
        replyTo: {
          id: replyingTo.id,
          content: replyingTo.content,
          senderName: replyingTo.senderName,
        },
      }),
    };

    socket.emit('sendMessage', { groupId: group.id, message });
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1E293B] rounded-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-gray-400 text-sm">{group.topic}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex flex-col ${message.senderId === user?.id ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${message.senderId === user?.id ? 'bg-blue-600' : 'bg-[#0F172A]'}`}>
                    {message.replyTo && (
                      <div className="mb-2 p-2 rounded bg-gray-800 text-sm">
                        <p className="text-gray-400">{message.replyTo.senderName}</p>
                        <p className="text-gray-300">{message.replyTo.content}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium">{message.senderName}</p>
                      <button onClick={() => handleReply(message)} className="text-gray-400 hover:text-white ml-2">
                        <Reply className="w-4 h-4" />
                      </button>
                    </div>
                    {message.attachments?.map((attachment, index) => (
                      <div key={index} className="mb-2">
                        {attachment.type === 'image' ? (
                          <img src={attachment.url} alt={attachment.name} className="max-w-full rounded-lg" />
                        ) : (
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                            <span>{attachment.name}</span>
                          </a>
                        )}
                      </div>
                    ))}
                    <p className="mt-1">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</p>
                      {message.senderId === user?.id && (
                        <span className="text-xs text-gray-400">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {['👍', '❤️', '😂', '😮', '😢', '🙏'].map((reaction) => (
                        <button
                          key={reaction}
                          onClick={() => handleReaction(message.id, reaction)}
                          className={`p-1 rounded-full hover:bg-gray-700 ${message.reactions?.[reaction]?.includes(user?.id || '') ? 'bg-gray-700' : ''}`}
                        >
                          {reaction}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="text-gray-400 text-sm">
                  {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              {replyingTo && (
                <div className="mb-2 p-2 bg-gray-800 rounded-lg flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-400">Replying to {replyingTo.senderName}</span>
                    <p className="text-gray-300 truncate">{replyingTo.content}</p>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex space-x-2">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="p-2 text-gray-400 hover:text-white cursor-pointer">
                  <Upload className="w-5 h-5" />
                </label>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#0F172A] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          <div className="w-64 border-l border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold">Members ({members.length})</h3>
            </div>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}
                  />
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;