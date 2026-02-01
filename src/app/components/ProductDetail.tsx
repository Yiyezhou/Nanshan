import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  sales: number;
  images: string[];
  specs: string[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState(product.specs[0]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </button>
          <span className="text-base text-gray-800">商品详情</span>
          <div className="flex items-center gap-3">
            <button className="p-1">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-1">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 商品图片轮播 */}
      <div className="relative bg-white">
        <div className="relative aspect-square">
          <ImageWithFallback
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* 图片指示器 */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'w-6 bg-blue-600'
                    : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 商品基本信息 */}
      <div className="bg-white px-4 py-4 mt-2">
        {/* 价格与销量 */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm text-red-500">¥</span>
            <span className="text-4xl text-red-500">{product.price}</span>
            <span className="text-base text-gray-400 line-through ml-1">
              ¥{product.originalPrice}
            </span>
          </div>
          <div className="text-base text-gray-500">
            已售 <span className="text-red-500">{product.sales}</span>
          </div>
        </div>
        
        <h1 className="text-lg text-gray-900 mb-2 leading-snug">{product.name}</h1>
        
        <div className="flex items-center gap-3 text-base text-gray-500">
          <span>{product.category}</span>
          <span>•</span>
          <span className="text-orange-500">一手信息</span>
        </div>
      </div>

      {/* 规格选择 */}
      <div className="bg-white px-4 py-4 mt-2">
        <h3 className="text-base text-gray-800 mb-3">选择规格</h3>
        <div className="flex flex-wrap gap-2">
          {product.specs.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`rounded-lg px-4 py-2 text-base transition-colors border ${
                selectedSpec === spec
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* 商品详情介绍 - 整体容器设计 */}
      <div className="mt-2 px-4 py-6">
        <div className="relative bg-white p-5 shadow-lg">
          {/* 左边装饰边框 */}
          <div className="absolute left-0 top-0 bottom-0 w-1">
            <div className="h-full bg-gradient-to-b from-pink-500 via-purple-600 to-blue-600"></div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pink-500"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-600"></div>
          </div>
          
          {/* 右边装饰边框 */}
          <div className="absolute right-0 top-0 bottom-0 w-1">
            <div className="h-full bg-gradient-to-b from-pink-500 via-purple-600 to-blue-600"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-pink-500"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-600"></div>
          </div>
          
          {/* 商品详情标题 */}
          <div className="mb-6 pb-4 border-b-2 border-gray-100">
            <h2 className="text-lg text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-pink-500 via-purple-600 to-blue-600 rounded-sm"></span>
              商品详情
            </h2>
          </div>
          
          {/* 产品特点 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rotate-45"></div>
              <h3 className="text-lg text-gray-900 relative inline-block">
                产品特点
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-transparent"></span>
              </h3>
            </div>
            <div className="text-base text-gray-700 leading-relaxed space-y-2 pl-4">
              <p>• 采用<span className="text-red-500">专业级电竞标准</span>，满足职业选手需求</p>
              <p>• <span className="text-red-500">人体工程学设计</span>，长时间使用不疲劳</p>
              <p>• RGB灯光效果，支持多种自定义模式</p>
              <p>• 优质材料打造，经久耐用</p>
            </div>
          </div>

          {/* 产品展示 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rotate-45"></div>
              <h3 className="text-lg text-gray-900 relative inline-block">
                产品展示
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent"></span>
              </h3>
            </div>
            <div className="space-y-3 pl-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwc2V0dXAlMjBkZXNrfGVufDF8fHx8MTczODQxNTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="产品展示1"
                className="w-full rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxlc3BvcnRzJTIwc2V0dXAlMjBkZXNrfGVufDF8fHx8MTczODQxNTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="产品展示2"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* 视频介绍 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rotate-45"></div>
              <h3 className="text-lg text-gray-900 relative inline-block">
                视频介绍
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></span>
              </h3>
            </div>
            <div className="pl-4">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                    <p className="text-base text-gray-700">点击播放产品视频</p>
                  </div>
                </div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJvb218ZW58MXx8fHwxNzM4NDE1OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="视频封面"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rotate-45"></div>
              <h3 className="text-lg text-gray-900 relative inline-block">
                使用说明
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></span>
              </h3>
            </div>
            <div className="text-base text-gray-700 leading-relaxed pl-4">
              <p className="mb-2 text-gray-500">如遇问题，请随时联系客服。</p>
              <p className="mb-2"><span className="text-red-500">*重要提示：</span></p>
              <div className="space-y-1.5">
                <p><span className="text-red-500">1. 首次使用前请仔细阅读说明书</span>，熟悉产品功能和操作方法。</p>
                <p>2. 请勿在潮湿环境中使用，如因操作不当等致损失，我们不承担任何责任！</p>
                <p>3. 定期清洁保养可延长使用寿命，<span className="text-red-500">并且按订单号」</span>查询售后进度。</p>
              </div>
            </div>
          </div>

          {/* 技术参数 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rotate-45"></div>
              <h3 className="text-lg text-gray-900 relative inline-block">
                技术参数
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-transparent"></span>
              </h3>
            </div>
            <div className="text-base text-gray-700 leading-relaxed space-y-2 pl-4">
              <p><span className="text-red-500">1. 品牌为电竞专业品牌</span>，未成年人请勿购买。如有需要必须遵守国家法律并征得监护人同意或在监护人陪同下进行。</p>
              <p>2. 产地：中国 | 保修期：1年</p>
              <p>3. 重量根据规格不同有所差异，<span className="text-red-500">本店所售为咨询兑换类服务</span>，请看清楚后下单。</p>
            </div>
          </div>

          {/* 底部确认按钮 */}
          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-base shadow-md">
              下单即视为同意
            </button>
          </div>
        </div>
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <p className="text-sm text-gray-400 text-center mb-2">
          提醒：仅限成年人且本人购买
        </p>
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
          立即购买
        </button>
      </div>
    </div>
  );
}
