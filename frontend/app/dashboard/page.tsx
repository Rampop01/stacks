import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Quest = {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'available';
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

type RecentActivity = {
  id: string;
  type: 'quest' | 'purchase' | 'level-up' | 'achievement';
  title: string;
  timestamp: string;
  value?: number;
};

// Mock data - in a real app, this would come from an API
const userStats = {
  level: 8,
  xp: 1250,
  xpToNextLevel: 2000,
  questsCompleted: 12,
  achievementsUnlocked: 5,
  rank: 42,
  totalUsers: 1000,
  currency: 3500,
  currencySymbol: 'STX',
};

const recentQuests: Quest[] = [
  { id: '1', title: 'Dragon Slayer', status: 'in-progress', xp: 500, difficulty: 'hard' },
  { id: '2', title: 'Potion Master', status: 'available', xp: 200, difficulty: 'medium' },
  { id: '3', title: 'First Steps', status: 'completed', xp: 100, difficulty: 'easy' },
];

const recentActivities: RecentActivity[] = [
  { id: '1', type: 'quest', title: 'Completed: Treasure Hunt', timestamp: '2 hours ago', value: 150 },
  { id: '2', type: 'level-up', title: 'Level Up! Reached Level 8', timestamp: '1 day ago' },
  { id: '3', type: 'purchase', title: 'Purchased: Elven Chainmail', timestamp: '2 days ago', value: 850 },
  { id: '4', type: 'achievement', title: 'Unlocked: Master Explorer', timestamp: '3 days ago' },
];

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

const activityIcons = {
  quest: '🏆',
  purchase: '🛒',
  'level-up': '⬆️',
  achievement: '🏅',
};

export default function DashboardPage() {
  const xpPercentage = Math.round((userStats.xp / userStats.xpToNextLevel) * 100);
  const rankPercentage = Math.round(((userStats.totalUsers - userStats.rank) / userStats.totalUsers) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      {/* Stone texture overlay */}
      <div className="absolute inset-0 stone-texture opacity-40" />

      {/* Torch glow effects */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-engraved tracking-wider uppercase bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
              Adventurer's Dashboard
            </h1>
            <p className="text-lg text-muted-foreground font-serif">
              Welcome back, Brave Explorer!
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4
          ">
            <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
              Edit Profile
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              New Quest
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <CardDescription>Current Level</CardDescription>
              <CardTitle className="text-3xl">{userStats.level}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                {userStats.xp} / {userStats.xpToNextLevel} XP
              </div>
              <Progress value={xpPercentage} className="h-2 bg-background" />
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <CardDescription>Rank</CardDescription>
              <CardTitle className="text-3xl">#{userStats.rank}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Top {rankPercentage}% of {userStats.totalUsers} adventurers
              </div>
              <Progress value={rankPercentage} className="h-2 bg-background" />
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <CardDescription>Quests Completed</CardDescription>
              <CardTitle className="text-3xl">{userStats.questsCompleted}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Keep going, brave adventurer!
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <CardDescription>Currency</CardDescription>
              <CardTitle className="text-3xl">{userStats.currency} {userStats.currencySymbol}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Earn More
                </Button>
                <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Quests */}
          <Card className="lg:col-span-2 bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle>Your Quests</CardTitle>
              <CardDescription>Continue your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuests.map((quest) => (
                  <div key={quest.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                    <div>
                      <div className="font-medium">{quest.title}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${difficultyColors[quest.difficulty]}`}></span>
                        {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                        <span className="mx-1">•</span>
                        {quest.xp} XP
                      </div>
                    </div>
                    <Button 
                      variant={quest.status === 'completed' ? 'outline' : 'default'} 
                      size="sm"
                      className={quest.status === 'completed' ? 'border-green-500 text-green-500 hover:bg-green-500/10' : ''}
                    >
                      {quest.status === 'completed' ? 'Completed' : 
                       quest.status === 'in-progress' ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-foreground">
                  View All Quests →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="text-2xl">
                      {activityIcons[activity.type]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                      {activity.value && (
                        <div className="text-sm text-green-400">+{activity.value} {activity.type === 'purchase' ? 'STX' : 'XP'}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-foreground">
                  View All Activity →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10 mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col h-24 justify-center items-center gap-2 border-primary/20 hover:bg-primary/5">
                <span className="text-2xl">🏛️</span>
                <span>Guild Hall</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 justify-center items-center gap-2 border-primary/20 hover:bg-primary/5">
                <span className="text-2xl">🎒</span>
                <span>Inventory</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 justify-center items-center gap-2 border-primary/20 hover:bg-primary/5">
                <span className="text-2xl">🏆</span>
                <span>Achievements</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 justify-center items-center gap-2 border-primary/20 hover:bg-primary/5">
                <span className="text-2xl">⚙️</span>
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg font-medium transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
