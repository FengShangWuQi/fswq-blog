import { React } from 'src-core/react';

import { Header } from './Header';
import { SocialLink } from './SocialLink';

import '../styles/BlogHeader.css';

export const BlogHeader = ({ totalCount }: { totalCount: number }) => {
  const socials = [
    {
      title: 'Twitter',
      url: 'https://twitter.com/fengshangwuqi',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/FengShangWuQi',
    },
    {
      title: 'WeChat',
    },
    {
      title: 'Email',
    },
    {
      title: 'Newsletter',
      url: 'https://tinyletter.com/fengshangwuqi',
    },
  ];
  const leftCenter = (
    <div className="author-content">
      <div style={{ width: 100 }} className="author-avatar">
        <img
          style={{ marginBottom: 25 }}
          className="author-avatar-img"
          src={require('../images/avatar.jpg')}
          alt="枫上雾棋"
        />
      </div>
      <div className="author-info">
        <div className="posts-total-count">{`${totalCount} 篇文章`}</div>
        <h1 style={{ fontSize: '2.25rem' }}>枫上雾棋的日志</h1>
        <ul className="author-link">
          {socials.map(social => (
            <SocialLink key={social.title} social={social} />
          ))}
        </ul>
      </div>
    </div>
  );

  return <Header leftCenter={leftCenter} />;
};
