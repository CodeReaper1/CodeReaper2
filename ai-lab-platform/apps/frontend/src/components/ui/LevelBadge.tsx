const colors = {
  BRONZE: 'bg-orange-100 text-orange-700',
  SILVER: 'bg-gray-100 text-gray-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  PLATINUM: 'bg-blue-100 text-blue-700',
  EXPERT: 'bg-purple-100 text-purple-700',
};

export default function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700'}`}>
      {level}
    </span>
  );
}
