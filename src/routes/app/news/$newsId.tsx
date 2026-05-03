import { createFileRoute } from '@tanstack/react-router'
import { useNews } from '#/features/admin/news/hooks/use-news'
import { NewsFormPage } from '#/features/admin/news/NewsFormPage'

export const Route = createFileRoute('/app/news/$newsId')({
  component: EditNewsRoute,
})

function EditNewsRoute() {
  const { newsId } = Route.useParams()
  const { data: newsList, isLoading } = useNews()
  const newsItem = newsList?.find(n => n.id === newsId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground text-[14px]">
        Loading...
      </div>
    )
  }

  if (!newsItem) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground text-[14px]">
        News not found.
      </div>
    )
  }

  return <NewsFormPage news={newsItem} />
}
