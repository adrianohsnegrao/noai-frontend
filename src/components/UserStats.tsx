interface UserStatsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  onStatClick?: (stat: 'posts' | 'followers' | 'following') => void;
}

const UserStats = ({ postsCount, followersCount, followingCount, onStatClick }: UserStatsProps) => {
  const stats = [
    { key: 'posts' as const, value: postsCount, label: 'Posts' },
    { key: 'followers' as const, value: followersCount, label: 'Followers' },
    { key: 'following' as const, value: followingCount, label: 'Following' },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex items-center gap-6 md:gap-8">
      {stats.map((stat) => (
        <button
          key={stat.key}
          onClick={() => onStatClick?.(stat.key)}
          className="text-center group cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={`${stat.value} ${stat.label}`}
        >
          <p className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {formatNumber(stat.value)}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {stat.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default UserStats;
