import React from "react"

export default function KaihGuideCard({ item }) {
  // Detect color scheme dynamically from provided config
  const getBaseColor = () => {
     if (item.ui.text.includes('secondary')) return 'secondary';
     if (item.ui.text.includes('aksen-1')) return 'accent';
     if (item.ui.text.includes('aksen-2')) return 'info';
     return 'primary';
  };

  const colorName = getBaseColor();
  
  const visualMap = {
     primary: "border-primary/30 bg-primary/5 text-primary",
     secondary: "border-secondary/30 bg-secondary/5 text-secondary",
     accent: "border-accent/30 bg-accent/5 text-accent",
     info: "border-info/30 bg-info/5 text-info",
  };

  return (
    <div className={`card bg-base-100 border-2 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden ${visualMap[colorName].split(' ')[0]}`}>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center text-2xl border border-base-200 ${visualMap[colorName].split(' ')[2]}`}>
            {item.icon}
          </div>
          <h3 className={`font-black text-lg tracking-tight ${visualMap[colorName].split(' ')[2]}`}>
             {item.label}
          </h3>
        </div>
        
        <div className={`rounded-2xl p-4 mt-1 border-t border-base-200/50 ${visualMap[colorName].split(' ')[1]}`}>
          <div
            className="prose prose-sm max-w-none text-base-content/70 font-bold leading-relaxed
                        [&_ol]:list-decimal [&_ol]:pl-5 
                        [&_ul]:list-disc [&_ul]:pl-5 
                        prose-headings:font-black prose-strong:text-base-content"
            dangerouslySetInnerHTML={{ 
              __html: (item.desc || "").replaceAll("&nbsp;", " ") 
            }}
          />
        </div>
        {item.hint && (
           <div className="text-[10px] font-black tracking-wide uppercase opacity-40 text-center mt-1">{item.hint}</div>
        )}
      </div>
    </div>
  )
}