import { useState } from 'react';
import { X, Star, Camera, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  escortName: string;
  orderId: string;
}

const positiveLabels = ['态度好', '有耐心', '技术强', '真实'];
const negativeLabels = ['态度差', '技术不行', '没完成'];

export function RatingModal({ isOpen, onClose, escortName, orderId }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPositive, setSelectedPositive] = useState<string[]>([]);
  const [selectedNegative, setSelectedNegative] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTogglePositive = (label: string) => {
    setSelectedPositive(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleToggleNegative = (label: string) => {
    setSelectedNegative(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4)); // 最多4张
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('请选择总体评分');
      return;
    }
    
    console.log('评价提交:', {
      orderId,
      escortName,
      rating,
      selectedPositive,
      selectedNegative,
      comment,
      images
    });
    
    // 重置表单
    setRating(0);
    setHoverRating(0);
    setSelectedPositive([]);
    setSelectedNegative([]);
    setComment('');
    setImages([]);
    
    alert('评价提交成功！');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] flex flex-col animate-slide-up">
        {/* 顶部拖拽指示器 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 头部 */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-800">评价护航员</h3>
            <p className="text-sm text-gray-500 mt-0.5">为 {escortName} 评分</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* 滚动内容区域 */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* 总体评分 - 必填 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-semibold text-gray-800">总体评分</h4>
              <span className="text-xs text-red-500">*必填</span>
            </div>
            <div className="flex gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600">
                {rating === 5 && '非常满意'}
                {rating === 4 && '满意'}
                {rating === 3 && '一般'}
                {rating === 2 && '不满意'}
                {rating === 1 && '非常不满意'}
              </p>
            )}
          </div>

          {/* 做得好的 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">做得好的</h4>
            <div className="flex flex-wrap gap-2">
              {positiveLabels.map((label) => (
                <button
                  key={label}
                  onClick={() => handleTogglePositive(label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPositive.includes(label)
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 做得不好的 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">做得不好的</h4>
            <div className="flex flex-wrap gap-2">
              {negativeLabels.map((label) => (
                <button
                  key={label}
                  onClick={() => handleToggleNegative(label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedNegative.includes(label)
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 你想说什么 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">你想说什么</h4>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="说说你的感受吧..."
              className="w-full h-28 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 上传照片 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">上传照片（选填）</h4>
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <ImageWithFallback
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 4 && (
                <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">添加</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="px-5 py-4 border-t border-gray-100 bg-white">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              提交评价
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
