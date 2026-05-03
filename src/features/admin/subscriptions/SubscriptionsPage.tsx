import { useMemo, useState } from 'react'
import { Mail } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { useSubscriptions } from './hooks/use-subscriptions'
import { SubscriptionList } from './components/SubscriptionList'

type Tab = 'all' | 'blog' | 'news' | 'general'

function Count({ source, data }: { source: Tab; data: ReturnType<typeof useSubscriptions>['data'] }) {
  const n = useMemo(() => {
    if (!data) return 0
    const active = data.filter(s => s.status === 'active')
    return source === 'all' ? active.length : active.filter(s => s.source === source).length
  }, [data, source])

  if (!n) return null
  return (
    <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-primary/10 text-primary text-[10px] font-bold px-1">
      {n}
    </span>
  )
}

export function SubscriptionsPage() {
  const { data, isLoading } = useSubscriptions()
  const [tab, setTab] = useState<Tab>('all')

  const isEmpty = !isLoading && (!data || data.length === 0)

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Subscriptions"
        description="Email subscribers segmented by source"
      />

      {isEmpty ? (
        <div className="bg-card rounded-[10px] border border-border overflow-hidden">
          <AdminEmptyState
            icon={Mail}
            title="No subscribers yet"
            description="Subscribers will appear here once visitors sign up from the blog or news pages."
          />
        </div>
      ) : (
        <Tabs value={tab} onValueChange={v => setTab(v as Tab)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex items-center">
              All
              <Count source="all" data={data} />
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center">
              Blog
              <Count source="blog" data={data} />
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center">
              News
              <Count source="news" data={data} />
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center">
              General
              <Count source="general" data={data} />
            </TabsTrigger>
          </TabsList>

          {(['all', 'blog', 'news', 'general'] as Tab[]).map(t => (
            <TabsContent key={t} value={t}>
              <div className="bg-card rounded-[10px] border border-border overflow-hidden">
                <SubscriptionList source={t} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
