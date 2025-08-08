import { onLoginUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Bot, Users, MessageCircle } from 'lucide-react'

export default async function DashboardPage() {
  const user = await onLoginUser()

  if (user.status !== 200 || !user.data) {
    redirect('/auth/sign-in')
  }

  const userData = user.data
  const domains = userData.domains || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userData.fullName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your chatbots and customer interactions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{domains.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chatbots</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {domains.reduce((acc, domain) => acc + domain.chatBots.length, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {domains.reduce((acc, domain) => acc + domain.customers.length, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userData.type}</div>
            </CardContent>
          </Card>
        </div>

        {/* Domains Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Your Domains</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Domain
            </Button>
          </div>

          {domains.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bot className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No domains yet
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Create your first domain to start building chatbots for your business
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Domain
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((domain) => (
                <Card key={domain.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {domain.image && (
                        <img
                          src={domain.image}
                          alt={domain.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <CardTitle className="text-lg">{domain.name}</CardTitle>
                        <CardDescription>
                          {domain.isActive ? (
                            <span className="text-green-600">Active</span>
                          ) : (
                            <span className="text-gray-500">Inactive</span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Chatbots:</span>
                        <span className="font-medium">{domain.chatBots.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customers:</span>
                        <span className="font-medium">{domain.customers.length}</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button variant="default" size="sm" className="w-full">
                        Manage Domain
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}