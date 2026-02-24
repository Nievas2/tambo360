import { Button } from '@/src/components/common/Button'
import { Card, CardHeader, CardTitle } from '@/src/components/common/card'
import { CircleAlert } from 'lucide-react'

const AlertsSection = () => {
  return (
    <Card className="w-full max-w-72">
      <CardHeader className="flex items-center justify-between w-full">
        <CardTitle className="flex items-center gap-2 font-bold">
          <CircleAlert /> Alertas
        </CardTitle>

        <Button variant="ghost" size="sm">
          Ver todas
        </Button>
      </CardHeader>
    </Card>
  )
}
export default AlertsSection
