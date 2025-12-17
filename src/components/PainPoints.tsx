import { Trash2, RefreshCcw, EyeOff } from 'lucide-react';

const painPoints = [
  {
    icon: <Trash2 className="w-8 h-8 text-red-500" />,
    title: "容易丢失",
    desc: "90% 的纸质名片在发出的 24 小时内就会被丢弃或遗忘，错失宝贵的商业机会。"
  },
  {
    icon: <RefreshCcw className="w-8 h-8 text-orange-500" />,
    title: "难以更新",
    desc: "职位晋升或更换电话后，旧名片瞬间作废。重新印制成本高，且无法触达老客户。"
  },
  {
    icon: <EyeOff className="w-8 h-8 text-slate-500" />,
    title: "数据盲区",
    desc: "名片发出去后，谁看了？谁存了？完全不知道。无法进行后续的精准跟进。"
  }
];

export function PainPoints() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            为什么您的名片需要<span className="text-(--color-brand-primary)">数字化升级</span>？
          </h2>
          <p className="text-slate-600">
            在这个数字化时代，传统的纸质名片已经成为商务社交的效率瓶颈。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/30 group">
              <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}