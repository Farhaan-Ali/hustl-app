import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function WalletScreen() {
  const [balanceVisible, setBalanceVisible] = React.useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const walletData = {
    balance: 247.50,
    pendingEarnings: 45.00,
    totalEarned: 1240.00,
    tasksCompleted: 47,
  };

  const transactions = [
    {
      id: 1,
      type: 'earned',
      title: 'Coffee Run - Starbucks',
      amount: 12.00,
      date: '2 hours ago',
      status: 'completed',
      taskId: 'T001'
    },
    {
      id: 2,
      type: 'earned',
      title: 'Print Assignment',
      amount: 8.00,
      date: '1 day ago',
      status: 'completed',
      taskId: 'T002'
    },
    {
      id: 3,
      type: 'withdrawal',
      title: 'Bank Transfer',
      amount: -50.00,
      date: '2 days ago',
      status: 'completed',
      reference: 'WD001'
    },
    {
      id: 4,
      type: 'earned',
      title: 'Chipotle Bowl Pickup',
      amount: 10.00,
      date: '3 days ago',
      status: 'completed',
      taskId: 'T003'
    },
    {
      id: 5,
      type: 'earned',
      title: 'Library Book Return',
      amount: 5.00,
      date: '1 week ago',
      status: 'completed',
      taskId: 'T004'
    }
  ];

  const quickActions = [
    {
      id: 'withdraw',
      title: 'Withdraw',
      icon: <ArrowUpRight size={24} color="#FFFFFF" />,
      gradient: ['#0021A5', '#001E3C'],
      action: () => {}
    },
    {
      id: 'add_payment',
      title: 'Add Payment',
      icon: <Plus size={24} color="#FFFFFF" />,
      gradient: ['#E6501E', '#FF7849'],
      action: () => {}
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Typography variant="h2" color="#ffffff">Wallet</Typography>
            <TouchableOpacity 
              style={styles.visibilityButton}
              onPress={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? (
                <Eye size={20} color="#ffffff" />
              ) : (
                <EyeOff size={20} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>

          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            Manage your earnings and payments
          </Typography>
        </Animated.View>
      </LinearGradient>

      {/* Balance Card */}
      <Animated.View style={[styles.balanceSection, { opacity: fadeAnim }]}>
        <ModernCard style={styles.balanceCard} variant="primary" gradient>
          <View style={styles.balanceHeader}>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">Available Balance</Typography>
            <CreditCard size={24} color="rgba(255,255,255,0.8)" />
          </View>
          
          <Typography variant="h1" color="#ffffff" style={styles.balanceAmount}>
            {balanceVisible ? `$${walletData.balance.toFixed(2)}` : '••••••'}
          </Typography>
          
          <View style={styles.balanceStats}>
            <View style={styles.balanceStat}>
              <Typography variant="caption" color="rgba(255,255,255,0.8)">Pending</Typography>
              <Typography variant="h4" color="#ffffff">
                {balanceVisible ? `$${walletData.pendingEarnings.toFixed(2)}` : '••••'}
              </Typography>
            </View>
            <View style={styles.balanceStat}>
              <Typography variant="caption" color="rgba(255,255,255,0.8)">Total Earned</Typography>
              <Typography variant="h4" color="#ffffff">
                {balanceVisible ? `$${walletData.totalEarned.toFixed(2)}` : '••••'}
              </Typography>
            </View>
          </View>
        </ModernCard>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View style={[styles.actionsSection, { opacity: fadeAnim }]}>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionCard} onPress={action.action}>
              <LinearGradient
                colors={action.gradient}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.actionIcon}>{action.icon}</View>
                <Typography variant="h4" color="#ffffff">{action.title}</Typography>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Stats Overview */}
      <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
        <ModernCard style={styles.statsCard} variant="accent">
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <TrendingUp size={24} color="#E6501E" />
              <View style={styles.statContent}>
                <Typography variant="h3">{walletData.tasksCompleted}</Typography>
                <Typography variant="body2" color="#001E3C">Tasks Completed</Typography>
              </View>
            </View>
            <View style={styles.statItem}>
              <DollarSign size={24} color="#0021A5" />
              <View style={styles.statContent}>
                <Typography variant="h3">
                  {balanceVisible ? `$${(walletData.totalEarned / walletData.tasksCompleted).toFixed(2)}` : '••••'}
                </Typography>
                <Typography variant="body2" color="#001E3C">Avg per Task</Typography>
              </View>
            </View>
          </View>
        </ModernCard>
      </Animated.View>

      {/* Transaction History */}
      <Animated.View style={[styles.transactionsSection, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Recent Transactions</Typography>
          <TouchableOpacity>
            <Typography variant="body2" color="#0021A5">View All</Typography>
          </TouchableOpacity>
        </View>
        
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} balanceVisible={balanceVisible} />
          ))}
        </View>
      </Animated.View>

      {/* Payment Methods */}
      <Animated.View style={[styles.paymentSection, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Payment Methods</Typography>
        <ModernCard style={styles.paymentCard}>
          <View style={styles.paymentMethod}>
            <View style={styles.paymentIcon}>
              <CreditCard size={20} color="#0021A5" />
            </View>
            <View style={styles.paymentInfo}>
              <Typography variant="h4">Bank Account</Typography>
              <Typography variant="body2" color="#001E3C">••••••1234</Typography>
            </View>
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">Primary</Typography>
            </Badge>
          </View>
        </ModernCard>
        
        <AnimatedButton
          title="Add Payment Method"
          onPress={() => {}}
          variant="outline"
          size="md"
          style={styles.addPaymentButton}
          icon={<Plus size={20} color="#0021A5" />}
        />
      </Animated.View>
    </ScrollView>
  );
}

function TransactionCard({ transaction, balanceVisible }: { transaction: any; balanceVisible: boolean }) {
  const isEarned = transaction.type === 'earned';
  const isPositive = transaction.amount > 0;
  
  return (
    <ModernCard style={styles.transactionCard}>
      <View style={styles.transactionContent}>
        <View style={[styles.transactionIcon, isEarned ? styles.earnedIcon : styles.withdrawalIcon]}>
          {isEarned ? (
            <ArrowDownLeft size={20} color="#ffffff" />
          ) : (
            <ArrowUpRight size={20} color="#ffffff" />
          )}
        </View>
        
        <View style={styles.transactionInfo}>
          <Typography variant="h4">{transaction.title}</Typography>
          <Typography variant="body2" color="#001E3C">{transaction.date}</Typography>
          {transaction.taskId && (
            <Typography variant="caption" color="#0021A5">Task ID: {transaction.taskId}</Typography>
          )}
        </View>
        
        <View style={styles.transactionAmount}>
          <Typography 
            variant="h4" 
            color={isPositive ? "#E6501E" : "#001E3C"}
            style={styles.amountText}
          >
            {balanceVisible ? `${isPositive ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}` : '••••'}
          </Typography>
          <Badge 
            variant={transaction.status === 'completed' ? 'secondary' : 'default'} 
            size="sm"
          >
            <Typography variant="caption" color={transaction.status === 'completed' ? "#FFFFFF" : "#001E3C"}>
              {transaction.status}
            </Typography>
          </Badge>
        </View>
      </View>
    </ModernCard>
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
  visibilityButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    marginLeft: 'auto',
  },
  balanceSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: -16,
  },
  balanceCard: {
    padding: 32,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceAmount: {
    marginBottom: 24,
    textAlign: 'center',
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  balanceStat: {
    alignItems: 'center',
  },
  actionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  statsCard: {
    padding: 24,
  },
  statsGrid: {
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statContent: {
    flex: 1,
  },
  transactionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    padding: 16,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  earnedIcon: {
    backgroundColor: '#E6501E',
  },
  withdrawalIcon: {
    backgroundColor: '#0021A5',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionAmount: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amountText: {
    fontFamily: 'Inter-SemiBold',
  },
  paymentSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  paymentCard: {
    padding: 16,
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#D8DDE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  addPaymentButton: {
    width: '100%',
  },
});