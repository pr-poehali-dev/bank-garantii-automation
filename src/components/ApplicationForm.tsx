import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ApplicationForm = () => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
          <span>Шаг. Укажите ФЗ, точную сумму, срок и ссылку на тендер</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fz">Федеральный закон</Label>
            <Input id="fz" placeholder="ФЗ-44, ФЗ-223" />
          </div>
          <div>
            <Label htmlFor="exact-amount">Точная сумма</Label>
            <Input id="exact-amount" placeholder="15 000 000 ₽" />
          </div>
          <div>
            <Label htmlFor="term">Срок действия</Label>
            <Input id="term" placeholder="12 месяцев" />
          </div>
          <div>
            <Label htmlFor="tender-link">Ссылка на тендер</Label>
            <Input id="tender-link" placeholder="https://zakupki.gov.ru/..." />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ApplicationForm