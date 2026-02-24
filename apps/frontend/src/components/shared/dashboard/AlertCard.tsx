import { Button } from '@/src/components/common/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import { History, Package } from 'lucide-react'

const AlertCard = () => {
  return (
    <Card className="bg-[#eaeaea] mx-4 rounded-lg gap-4">
      <CardHeader className="space-y-1">
        <CardTitle>Mermas excesivas en Queso pategrás</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span className="flex gap-2 text-xs">
            <History className="size-3" /> Enero 2026
          </span>

          <span className="flex gap-2 text-xs">
            <Package className="size-3" /> L-003, L006
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 mx-4 p-1">
        <p>Quesos varían más que leche, que se mantiene estable.</p>
      </CardContent>

      <CardFooter className="justify-between gap-2 w-full">
        <Button className="flex-1">Ver alerta</Button>
        <Button variant="outline" className="flex-1">
          Ver lote
        </Button>
      </CardFooter>
    </Card>
  )
}
export default AlertCard
