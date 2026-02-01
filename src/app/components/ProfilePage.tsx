import { useState } from 'react';
import { ChevronRight, Store, BarChart3, Briefcase, Wallet, Gift, Settings, Bell, Shield, CreditCard, FileText, Award, Star, UserCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { RatingModal } from '@/app/components/RatingModal';

// 用户信息数据
const userInfo = {
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  nickname: '电竞玩家008',
  gameId: 'ESports#8888',
  roles: ['管理员', '玩家', '打手']
};

// 功能入口数据
const functionEntries = [
  { id: 1, icon: Store, title: '入驻平台', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 2, icon: BarChart3, title: '交易数据', color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 3, icon: Briefcase, title: '接单入口', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { id: 4, icon: Wallet, title: '我的钱包', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { id: 5, icon: Gift, title: '优惠券', color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { id: 6, icon: Award, title: '我的等级', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { id: 7, icon: Bell, title: '消息中心', color: 'text-red-600', bgColor: 'bg-red-50' },
  { id: 8, icon: Settings, title: '设置', color: 'text-gray-600', bgColor: 'bg-gray-50' }
];

// 订单状态数据
const orderStatuses = [
  { id: 'all', name: '全部', count: 15 },
  { id: 'paid', name: '已付款', count: 3 },
  { id: 'received', name: '已接单', count: 5 },
  { id: 'completed', name: '已完成', count: 6 },
  { id: 'refunded', name: '已退款', count: 1 }
];

// 订单数据
const orders = [
  {
    id: 'ORD20260131001',
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    productName: '雷蛇黑寡妇机械键盘 RGB',
    gameId: 'Player#1234',
    orderTime: '2026-01-30 14:30',
    amount: 899,
    status: 'paid',
    statusText: '已付款',
    statusColor: 'text-orange-600 bg-orange-50',
    hasException: false,
    escortName: '张小明',
    hasRated: false
  },
  {
    id: 'ORD20260131002',
    productImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    productName: '罗技 G502 游戏鼠标',
    gameId: 'Player#5678',
    orderTime: '2026-01-29 16:45',
    amount: 399,
    status: 'received',
    statusText: '已接单',
    statusColor: 'text-blue-600 bg-blue-50',
    hasException: false,
    escortName: '李芳',
    hasRated: false
  },
  {
    id: 'ORD20260131003',
    productImage: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    productName: 'HyperX Cloud II 电竞耳机',
    gameId: 'Player#9999',
    orderTime: '2026-01-28 10:20',
    amount: 599,
    status: 'completed',
    statusText: '已完成',
    statusColor: 'text-green-600 bg-green-50',
    hasException: false,
    escortName: '王强',
    hasRated: true
  },
  {
    id: 'ORD20260131004',
    productImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400',
    productName: 'AOC 27英寸 240Hz 电竞显示器',
    gameId: 'Player#3333',
    orderTime: '2026-01-27 09:15',
    amount: 2399,
    status: 'refunded',
    statusText: '已退款',
    statusColor: 'text-gray-600 bg-gray-50',
    hasException: true,
    exceptionReason: '异常原因：用户买错了，已退款',
    escortName: '刘洋',
    hasRated: false
  },
  {
    id: 'ORD20260131005',
    productImage: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400',
    productName: 'DXRacer 电竞椅',
    gameId: 'Player#7777',
    orderTime: '2026-01-26 18:30',
    amount: 1899,
    status: 'completed',
    statusText: '已完成',
    statusColor: 'text-green-600 bg-green-50',
    hasException: false,
    escortName: '陈美玲',
    hasRated: false
  }
];

interface ProfilePageProps {
  onOrderClick?: (orderId: string) => void;
}

export function ProfilePage({ onOrderClick }: ProfilePageProps) {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; escortName: string } | null>(null);

  const handleRateClick = (orderId: string, escortName: string) => {
    setSelectedOrder({ id: orderId, escortName });
    setRatingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 用户信息区域 */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4">
          {/* 用户头像 */}
          <div className="relative">
            <ImageWithFallback
              src={userInfo.avatar}
              alt={userInfo.nickname}
              className="w-16 h-16 rounded-full border-4 border-white/30 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          {/* 用户信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white text-lg font-bold">{userInfo.nickname}</h2>
              <ChevronRight className="h-4 w-4 text-white/80" />
            </div>
            <p className="text-white/90 text-sm mb-2">游戏ID: {userInfo.gameId}</p>
            <div className="flex gap-1.5">
              {userInfo.roles.map((role, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 功能入口横划列表 */}
      <div className="bg-white px-4 py-3 -mt-4 mx-4 rounded-xl shadow-sm">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {functionEntries.map((entry) => {
            const IconComponent = entry.icon;
            return (
              <button
                key={entry.id}
                className="flex flex-col items-center gap-1.5 min-w-[70px]"
              >
                <div className={`w-12 h-12 ${entry.bgColor} rounded-xl flex items-center justify-center`}>
                  <IconComponent className={`h-6 w-6 ${entry.color}`} />
                </div>
                <span className="text-xs text-gray-700 text-center whitespace-nowrap">{entry.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 订单列表区域 */}
      <div className="mt-4">
        {/* 订单状态分类 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base text-gray-800 font-medium">我的订单</h3>
            <button className="flex items-center gap-1 text-sm text-gray-500">
              查看全部
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {orderStatuses.map((status) => (
              <button
                key={status.id}
                className="flex flex-col items-center gap-1 min-w-[60px] py-2 px-3 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-800">{status.name}</span>
                {status.count > 0 && (
                  <span className="text-xs text-gray-500">({status.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 订单卡片列表 */}
        <div className="px-4 py-2 space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              onClick={() => onOrderClick?.(order.id)}
            >
              {/* 订单头部 */}
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-600">订单号: {order.id}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${order.statusColor}`}>
                  {order.statusText}
                </span>
              </div>

              {/* 订单内容 */}
              <div className="p-3">
                <div className="flex gap-3">
                  {/* 商品图片 */}
                  <div className="relative flex-shrink-0">
                    <ImageWithFallback
                      src={order.productImage}
                      alt={order.productName}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>

                  {/* 订单信息 */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* 商品名称 */}
                    <h4 className="text-sm text-gray-800 font-semibold mb-1.5 line-clamp-2 leading-snug">
                      {order.productName}
                    </h4>
                    
                    {/* 游戏ID */}
                    <div className="flex items-center gap-1 mb-1.5">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs text-gray-600">{order.gameId}</span>
                    </div>
                    
                    {/* 日期和护航员 */}
                    <div className="flex items-center justify-between mb-auto">
                      <span className="text-xs text-gray-400">
                        {order.orderTime}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-md">
                        <UserCircle className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-500">护航员:</span>
                        <span className="text-xs text-blue-600 font-medium">{order.escortName}</span>
                      </div>
                    </div>
                    
                    {/* 价格和操作按钮 */}
                    <div className="flex items-end justify-between mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-gray-400">¥</span>
                        <span className="text-lg font-bold text-red-600">{order.amount}</span>
                      </div>
                      {order.status === 'completed' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRateClick(order.id, order.escortName);
                          }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            order.hasRated
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm hover:shadow-md'
                          }`}
                          disabled={order.hasRated}
                        >
                          <Star className={`h-3.5 w-3.5 ${order.hasRated ? '' : 'fill-white'}`} />
                          {order.hasRated ? '已评价' : '去评价'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 异常提示 */}
                {order.hasException && order.exceptionReason && (
                  <div className="mt-3 px-3 py-2 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-600 flex-1">
                      {order.exceptionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部安全提示 */}
      <div className="px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
          <Shield className="h-3 w-3" />
          <span>您的信息受到严格保护</span>
        </div>
      </div>

      {/* 评价弹窗 */}
      {selectedOrder && (
        <RatingModal
          isOpen={ratingModalOpen}
          onClose={() => setRatingModalOpen(false)}
          escortName={selectedOrder.escortName}
          orderId={selectedOrder.id}
        />
      )}
    </div>
  );
}
