import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LeaderboardEntry = {
  rank: number;
  address: string;
  level: number;
  xp: number;
  questsCompleted: number;
};

// Mock data - in a real app, this would come from an API
const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, address: "0x1a2b...3c4d", level: 12, xp: 12850, questsCompleted: 24 },
  { rank: 2, address: "0x2b3c...4d5e", level: 11, xp: 11500, questsCompleted: 22 },
  { rank: 3, address: "0x3c4d...5e6f", level: 11, xp: 11050, questsCompleted: 21 },
  { rank: 4, address: "0x4d5e...6f7a", level: 10, xp: 9800, questsCompleted: 19 },
  { rank: 5, address: "0x5e6f...7a8b", level: 10, xp: 9200, questsCompleted: 18 },
  { rank: 6, address: "0x6f7a...8b9c", level: 9, xp: 8450, questsCompleted: 16 },
  { rank: 7, address: "0x7a8b...9cad", level: 9, xp: 8100, questsCompleted: 15 },
  { rank: 8, address: "0x8b9c...adbe", level: 8, xp: 7500, questsCompleted: 14 },
  { rank: 9, address: "0x9cad...becf", level: 8, xp: 7200, questsCompleted: 13 },
  { rank: 10, address: "0xadbe...cfd0", level: 7, xp: 6800, questsCompleted: 12 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-3 h-3 rotate-45 border-2 border-primary" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-engraved tracking-wider uppercase bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
            Hall of Heroes
          </h1>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            The mightiest warriors of Stacks Quest
          </p>
        </div>

        <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-foreground">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-primary/20">
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Level</TableHead>
                  <TableHead className="text-center">XP</TableHead>
                  <TableHead className="text-center">Quests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow key={entry.rank} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                    <TableCell className="text-center font-mono">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${entry.rank <= 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-muted'} font-bold`}>
                        {entry.rank}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">
                      <Link href={`/profile/${entry.address}`} className="hover:text-primary transition-colors">
                        {entry.address}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {entry.level}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-mono">{entry.xp.toLocaleString()}</TableCell>
                    <TableCell className="text-center">{entry.questsCompleted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
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
