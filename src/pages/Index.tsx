import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [guaranteeAmount, setGuaranteeAmount] = useState('')
  const [dragActive, setDragActive] = useState(false)

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileName = e.dataTransfer.files[0].name
      setUploadedFiles(prev => [...prev, fileName])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name
      setUploadedFiles(prev => [...prev, fileName])
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-primary shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">БАНКОВСКИЕ ГАРАНТИИ.РУ</h1>
            </div>
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <Icon name="Clock" size={20} />
              <span id="current-time">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900">Автоматизированная система выпуска банковских гарантий</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Мы официальные партнеры многих банков России! Сайт создан в целях автоматизации выпуска банковской гарантии, 
            чтобы уйти от телефонных переговоров и сразу же приступить к оформлению банковской гарантии.
          </p>
        </div>

        {/* Main Application Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="FileText" className="text-primary" />
                <span>Подача заявки на гарантию</span>
              </CardTitle>
              <CardDescription>
                Заполните форму для получения банковской гарантии. Все ссылки на подписания будут приходить на вашу почту.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Шаг 1: Выберите сумму гарантии</h3>
                <Select value={guaranteeAmount} onValueChange={setGuaranteeAmount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите диапазон суммы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">Коммерческая банковская гарантия</SelectItem>
                    <SelectItem value="1-5-express">Экспресс гарантия от 1 до 5 миллионов</SelectItem>
                    <SelectItem value="10-100">Банковская гарантия от 10 до 100 миллионов</SelectItem>
                    <SelectItem value="100+">Банковская гарантия от 100 миллионов и выше</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Шаг 2: Основная информация</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exact-amount">Точная сумма</Label>
                    <Input id="exact-amount" placeholder="15 000 000" />
                  </div>
                  <div>
                    <Label htmlFor="term">Срок действия</Label>
                    <Input id="term" placeholder="12 месяцев" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fz">Федеральный закон</Label>
                  <Input id="fz" placeholder="ФЗ-44, ФЗ-223" />
                </div>
                <div>
                  <Label htmlFor="tender-link">Ссылка на тендер</Label>
                  <Input id="tender-link" placeholder="https://zakupki.gov.ru/..." />
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Icon name="Send" className="mr-2" size={20} />
                Подать заявку
              </Button>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Upload" className="text-secondary" />
                <span>Загрузка документов</span>
              </CardTitle>
              <CardDescription>
                Перетащите файлы в область загрузки или нажмите для выбора
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Перетащите документы сюда</p>
                <p className="text-gray-500 mb-4">или</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Выберите файлы
                </Button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Загруженные файлы:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                      <Icon name="FileCheck" className="text-green-600" size={16} />
                      <span className="text-sm">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>



        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Shield" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Гарантированная безопасность</h3>
              <p className="text-gray-600 text-sm">Все документы защищены электронной подписью и шифрованием</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Zap" className="mx-auto mb-4 text-secondary" size={48} />
              <h3 className="font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-gray-600 text-sm">Экспресс-гарантии за 1-3 рабочих дня</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Users" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Персональный менеджер</h3>
              <p className="text-gray-600 text-sm">Индивидуальное сопровождение каждой сделки</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index