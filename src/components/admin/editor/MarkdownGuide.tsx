
import React from 'react';

const MarkdownGuide = () => {
  return (
    <div className="bg-muted p-2 rounded-md text-sm mb-2">
      <p>✨ HTML과 마크다운을 지원합니다:</p>
      <ul className="list-disc pl-4 text-xs space-y-1">
        <li>마크다운: **굵게**, *기울임*, # 제목</li>
        <li>HTML: &lt;strong&gt;, &lt;em&gt;, &lt;h1&gt;</li>
        <li>복잡한 HTML은 미리보기에서 확인해주세요</li>
        <li>이미지는 상단의 이미지 추가 버튼을 이용해주세요</li>
      </ul>
    </div>
  );
};

export default MarkdownGuide;
