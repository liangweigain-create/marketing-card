import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from "../lib/utils";

interface FormData {
  name: string;
  mobile: string;
  companyName: string;
  companySize: string;
  region: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  companyName?: string;
  companySize?: string;
  region?: string;
}

export const ContactInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    companyName: '',
    companySize: '',
    region: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [openDropdown, setOpenDropdown] = useState(false);

  // Auto-scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = '请输入你的姓名';
      isValid = false;
    }

    if (!/^1[3-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = '请输入有效的手机号';
      isValid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = '请输入企业名称';
      isValid = false;
    }

    if (!formData.companySize) {
      newErrors.companySize = '请选择公司规模';
      isValid = false;
    }

    if (!formData.region.trim()) {
      newErrors.region = '请输入所在地区';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      alert('提交成功！我们会尽快联系您。');
      navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center font-bold text-lg pr-8">
            联系我们
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">立即预约体验</h2>
            <p className="text-slate-500 text-sm">填写下方信息，我们将为您安排专属顾问演示。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">你的姓名</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入你的姓名"
              className={cn(
                "w-full px-4 py-3 bg-white border rounded-lg text-base outline-none transition-all placeholder:text-slate-400",
                errors.name 
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                  : "border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              )}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">手机号</label>
            <div className={cn(
               "flex rounded-lg border overflow-hidden transition-all",
               errors.mobile
                 ? "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20"
                 : "border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20"
            )}>
              <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 text-slate-600 font-medium">
                +86
              </div>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="请输入手机号"
                className="flex-1 px-4 py-3 bg-white outline-none w-full placeholder:text-slate-400"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">企业名称</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="请输入企业名称"
              className={cn(
                "w-full px-4 py-3 bg-white border rounded-lg text-base outline-none transition-all placeholder:text-slate-400",
                errors.companyName
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                  : "border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              )}
            />
            {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">公司规模</label>
            {/* Custom Select Component */}
            <div className="relative">
              <input type="hidden" name="companySize" value={formData.companySize} />
              <button
                type="button"
                onClick={() => setOpenDropdown(prev => !prev)}
                onBlur={() => setTimeout(() => setOpenDropdown(false), 200)}
                className={cn(
                  "w-full px-4 py-3 bg-white border rounded-lg text-base outline-none transition-all text-left flex items-center justify-between",
                  errors.companySize
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20",
                  !formData.companySize ? "text-slate-400" : "text-slate-900"
                )}
              >
                <span>
                  {formData.companySize 
                    ? (
                        formData.companySize === 'less_100' ? '100人以下' :
                        formData.companySize === '100_200' ? '100-200人' :
                        '200人以上'
                      )
                    : "请选择公司规模"
                  }
                </span>
                <ChevronRight className={cn(
                    "w-5 h-5 text-slate-400 transition-transform duration-200",
                    openDropdown ? "rotate-90" : "rotate-0"
                )} />
              </button>
              
              {/* Dropdown Menu */}
              <div val-test-id="dropdown-options" className={cn(
                  "absolute z-20 w-full mt-1 bg-white border border-slate-100 rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top",
                  openDropdown ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              )}>
                  {[
                      { value: 'less_100', label: '100人以下' },
                      { value: '100_200', label: '100-200人' },
                      { value: 'more_200', label: '200人以上' }
                  ].map((option) => (
                      <div
                          key={option.value}
                          onClick={() => {
                              setFormData(prev => ({ ...prev, companySize: option.value }));
                              if (errors.companySize) setErrors(prev => ({ ...prev, companySize: undefined }));
                              setOpenDropdown(false);
                          }}
                          className={cn(
                              "px-4 py-3 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between",
                              formData.companySize === option.value && "bg-blue-50 text-blue-600 font-medium"
                          )}
                      >
                          {option.label}
                          {formData.companySize === option.value && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                      </div>
                  ))}
              </div>
            </div>
            {errors.companySize && <p className="text-red-500 text-xs">{errors.companySize}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className={cn(
                "w-full py-3.5 rounded-full font-bold text-white transition-all shadow-lg active:scale-95 bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 cursor-pointer"
              )}
            >
              提交
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};