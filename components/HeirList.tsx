import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Heir {
  id: number;
  first_name: string;
  last_name: string;
  middle_initial?: string;
  suffix?: string;
  email: string;
  phone: string;
  street_address_1: string;
  street_address_2?: string;
  city: string;
  state: string;
  zip_code: string;
  target_percentage: number;
  created_at: string;
  updated_at: string;
}

async function getHeirs(): Promise<Heir[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/heirs`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch heirs');
  }
  return res.json();
}

function HeirCard({ heir }: { heir: Heir }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>{`${heir.first_name[0]}${heir.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{`${heir.first_name} ${heir.middle_initial ? heir.middle_initial + '. ' : ''}${heir.last_name}${heir.suffix ? ', ' + heir.suffix : ''}`}</CardTitle>
          <p className="text-sm text-muted-foreground">{heir.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p><strong>Phone:</strong> {heir.phone}</p>
        <p><strong>Address:</strong> {heir.street_address_1}{heir.street_address_2 ? ', ' + heir.street_address_2 : ''}, {heir.city}, {heir.state} {heir.zip_code}</p>
        <p><strong>Target Percentage:</strong> {heir.target_percentage}%</p>
        <p><strong>Created:</strong> {new Date(heir.created_at).toLocaleDateString()}</p>
        <p><strong>Last Updated:</strong> {new Date(heir.updated_at).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}

export default async function HeirsList() {
  const heirs = await getHeirs()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {heirs.map((heir) => (
        <HeirCard key={heir.id} heir={heir} />
      ))}
    </div>
  )
}