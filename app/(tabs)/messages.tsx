import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Animated, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Send, Phone, Video, MoveHorizontal as MoreHorizontal, ArrowLeft, Paperclip, Smile } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const conversations = [
    {
      id: 1,
      name: 'Sarah M.',
      lastMessage: 'Perfect! I\'ll be there in 10 minutes',
      time: '2m ago',
      unread: 2,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      online: true,
      task: 'Starbucks Coffee Run',
      taskPrice: 12
    },
    {
      id: 2,
      name: 'Mike R.',
      lastMessage: 'Thanks for the quick delivery!',
      time: '1h ago',
      unread: 0,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      online: false,
      task: 'Print Assignment',
      taskPrice: 8
    },
    {
      id: 3,
      name: 'Emma K.',
      lastMessage: 'Can you pick up extra napkins?',
      time: '3h ago',
      unread: 1,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      online: true,
      task: 'Chipotle Bowl Pickup',
      taskPrice: 10
    }
  ];

  const messages = [
    {
      id: 1,
      text: 'Hey! I accepted your coffee run task. What size and any special requests?',
      sender: 'other',
      time: '10:30 AM',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      text: 'Great! I need a venti iced coffee with oat milk and one pump of vanilla. Thanks!',
      sender: 'me',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'Perfect! I\'m heading to Starbucks now. Should take about 15 minutes total.',
      sender: 'other',
      time: '10:33 AM',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      text: 'Awesome! I\'ll be at Turlington Plaza. Look for someone in a blue UF hoodie.',
      sender: 'me',
      time: '10:35 AM'
    },
    {
      id: 5,
      text: 'Perfect! I\'ll be there in 10 minutes',
      sender: 'other',
      time: '10:45 AM',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const sendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending logic here
      setMessageText('');
    }
  };

  if (selectedChat) {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="light" />
        
        {/* Chat Header */}
        <LinearGradient
          colors={['#0021A5', '#001E3C']}
          style={styles.chatHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.chatHeaderContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedChat(null)}
            >
              <ArrowLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <View style={styles.chatUserInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: selectedChat.avatar }} style={styles.chatAvatar} />
                {selectedChat.online && <View style={styles.onlineIndicator} />}
              </View>
              <View style={styles.chatUserDetails}>
                <Typography variant="h4" color="#ffffff">{selectedChat.name}</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  {selectedChat.task} • ${selectedChat.taskPrice}
                </Typography>
              </View>
            </View>
            
            <View style={styles.chatActions}>
              <TouchableOpacity style={styles.chatActionButton}>
                <Phone size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Video size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <MoreHorizontal size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input */}
        <View style={styles.messageInputContainer}>
          <View style={styles.messageInputWrapper}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={20} color="#001E3C" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={500}
            />
            
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={20} color="#001E3C" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.sendButton, messageText.trim() && styles.sendButtonActive]}
              onPress={sendMessage}
            >
              <Send size={18} color={messageText.trim() ? "#ffffff" : "#D8DDE6"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0021A5', '#001E3C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <Typography variant="h2" color="#ffffff">Messages</Typography>
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">{conversations.filter(c => c.unread > 0).length}</Typography>
            </Badge>
          </View>

          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            Stay connected with your task partners
          </Typography>
        </Animated.View>
      </LinearGradient>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ConversationCard conversation={item} onPress={() => setSelectedChat(item)} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ConversationCard({ conversation, onPress }: { conversation: any; onPress: () => void }) {
  return (
    <ModernCard style={styles.conversationCard} onPress={onPress}>
      <View style={styles.conversationContent}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
          {conversation.online && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Typography variant="h4">{conversation.name}</Typography>
            <Typography variant="body2" color="#001E3C">{conversation.time}</Typography>
          </View>
          
          <Typography variant="body2" color="#001E3C" numberOfLines={1} style={styles.lastMessage}>
            {conversation.lastMessage}
          </Typography>
          
          <View style={styles.taskInfo}>
            <Typography variant="caption" color="#0021A5">{conversation.task}</Typography>
            <Typography variant="caption" color="#E6501E"> • ${conversation.taskPrice}</Typography>
          </View>
        </View>
        
        {conversation.unread > 0 && (
          <Badge variant="secondary" size="sm" style={styles.unreadBadge}>
            <Typography variant="caption" color="#FFFFFF">{conversation.unread}</Typography>
          </Badge>
        )}
      </View>
    </ModernCard>
  );
}

function MessageBubble({ message }: { message: any }) {
  const isMe = message.sender === 'me';
  
  return (
    <View style={[styles.messageBubbleContainer, isMe ? styles.myMessageContainer : styles.otherMessageContainer]}>
      {!isMe && (
        <Image source={{ uri: message.avatar }} style={styles.messageAvatar} />
      )}
      
      <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.otherMessage]}>
        <Typography 
          variant="body2" 
          color={isMe ? "#ffffff" : "#001E3C"}
          style={styles.messageText}
        >
          {message.text}
        </Typography>
        <Typography 
          variant="caption" 
          color={isMe ? "rgba(255,255,255,0.8)" : "#D8DDE6"}
          style={styles.messageTime}
        >
          {message.time}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  conversationsList: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  conversationCard: {
    marginBottom: 16,
    padding: 16,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E6501E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  lastMessage: {
    marginBottom: 4,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadBadge: {
    marginLeft: 12,
  },
  chatHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  chatHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  chatUserInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatUserDetails: {
    flex: 1,
  },
  chatActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chatActionButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myMessage: {
    backgroundColor: '#0021A5',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    marginBottom: 4,
    lineHeight: 20,
  },
  messageTime: {
    alignSelf: 'flex-end',
  },
  messageInputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#D8DDE6',
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F7FF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  attachButton: {
    padding: 4,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#001E3C',
    maxHeight: 100,
    minHeight: 20,
  },
  emojiButton: {
    padding: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D8DDE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#0021A5',
  },
});