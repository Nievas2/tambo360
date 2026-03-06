import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/common/card'

export const AlertCardSkeleton = () => (
  <Card className="bg-muted/50 mx-4 rounded-lg gap-4 animate-pulse">
    <CardHeader className="space-y-2">
      <div className="h-5 bg-gray-300 rounded w-3/4" />
      <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </CardHeader>
    <CardContent className="mx-4 p-1">
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </CardContent>
    <CardFooter className="justify-between gap-2 w-full">
      <div className="h-10 bg-gray-300 rounded flex-1" />
      <div className="h-10 bg-gray-300 rounded flex-1" />
    </CardFooter>
  </Card>
)
