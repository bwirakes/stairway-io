import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Folder, Mail, MapPin, Phone } from "lucide-react"

export default function EstateAccountPage() {
  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Executor" />
            <AvatarFallback>EX</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Estate Executor</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164.5 hours</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            <Tabs defaultValue="jan" className="mt-4">
              <TabsList>
                <TabsTrigger value="jan">Jan</TabsTrigger>
                <TabsTrigger value="feb">Feb</TabsTrigger>
                <TabsTrigger value="mar">Mar</TabsTrigger>
              </TabsList>
              <TabsContent value="jan">
                <div className="text-sm">January: 52.5 hours</div>
                <Progress value={52.5} className="mt-2" />
              </TabsContent>
              <TabsContent value="feb">
                <div className="text-sm">February: 48 hours</div>
                <Progress value={48} className="mt-2" />
              </TabsContent>
              <TabsContent value="mar">
                <div className="text-sm">March: 64 hours</div>
                <Progress value={64} className="mt-2" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2 text-sm">
                <div>Legal Fees</div>
                <div className="font-medium">$5,200</div>
              </div>
              <Progress value={41.6} className="mb-2" />
              <div className="flex items-center justify-between mb-2 text-sm">
                <div>Travel Expenses</div>
                <div className="font-medium">$3,800</div>
              </div>
              <Progress value={30.4} className="mb-2" />
              <div className="flex items-center justify-between mb-2 text-sm">
                <div>Administrative Costs</div>
                <div className="font-medium">$2,150</div>
              </div>
              <Progress value={17.2} className="mb-2" />
              <div className="flex items-center justify-between text-sm">
                <div>Miscellaneous</div>
                <div className="font-medium">$1,300</div>
              </div>
              <Progress value={10.4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">123 Main St, Anytown, USA 12345</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 text-xl font-bold">Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {["Finances", "Legal", "Real Estate", "Distributions"].map((category) => (
          <Card key={category}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{category}</CardTitle>
              <Folder className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <span>Task 1</span>
                  <span className="text-muted-foreground">In Progress</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span>Task 2</span>
                  <span className="text-muted-foreground">Completed</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span>Task 3</span>
                  <span className="text-muted-foreground">Pending</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                View All
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}