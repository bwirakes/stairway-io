'use client'

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

  export function HeirCard({ heir }: { heir: Heir }) {

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${heir.first_name} ${heir.last_name}`} />
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
      </CardContent>
    </Card>
  )
}