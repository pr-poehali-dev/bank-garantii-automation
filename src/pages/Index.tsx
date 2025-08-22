import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MarketTicker from '@/components/MarketTicker'
import GuaranteeOptions from '@/components/GuaranteeOptions'
import ApplicationForm from '@/components/ApplicationForm'
import DocumentRequirements from '@/components/DocumentRequirements'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [moscowTime, setMoscowTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
  const [sakhalinTime, setSakhalinTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Sakhalin' }))
  const [vladivostokTime, setVladivostokTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Vladivostok' }))
  const [uralTime, setUralTime] = useState(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }))
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [guaranteeAmount, setGuaranteeAmount] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMoscowTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' }))
      setSakhalinTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Sakhalin' }))
      setVladivostokTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Vladivostok' }))
      setUralTime(new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }))
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
      const file = e.dataTransfer.files[0]
      setUploadedFiles(prev => [...prev, file])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFiles(prev => [...prev, file])
    }
  }

  const handleDocumentUpload = (file: File) => {
    setUploadedFiles(prev => [...prev, file])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSelectGuarantee = () => {
    document.getElementById('submit-application')?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendEmailWithAttachments = async () => {
    if (uploadedFiles.length === 0) {
      alert('Пожалуйста, прикрепите документы перед отправкой заявки')
      return
    }

    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append('api_key', 'ba42c3d9-0cfe-43b4-816a-cbe491f04fca')
      formData.append('to', 'garantiya25@mail.ru')
      formData.append('subject', 'Новая заявка на банковскую гарантию')
      formData.append('text', `Новая заявка на банковскую гарантию.

Количество прикрепленных документов: ${uploadedFiles.length}`)
      
      uploadedFiles.forEach((file, index) => {
        formData.append(`attachment_${index}`, file)
      })

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        alert('Заявка успешно отправлена!')
        setUploadedFiles([])
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Банковские гарантии
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
              Быстрое оформление банковских гарантий для участия в тендерах и государственных закупках
            </p>
            
            {/* Time Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Москва</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{moscowTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Урал</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{uralTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Владивосток</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{vladivostokTime}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs text-slate-500 mb-1">Сахалин</div>
                <div className="font-mono text-sm font-semibold text-slate-700">{sakhalinTime}</div>
              </div>
            </div>
          </div>

          {/* Market Ticker */}
          <MarketTicker />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Step 1: Choose Guarantee Amount */}
          <GuaranteeOptions onSelectGuarantee={handleSelectGuarantee} />

          {/* Step 2: Details */}
          <ApplicationForm />

          {/* Document Requirements */}
          <DocumentRequirements 
            uploadedFiles={uploadedFiles}
            onDocumentUpload={handleDocumentUpload}
            onRemoveFile={handleRemoveFile}
            onSubmitApplication={sendEmailWithAttachments}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Shield" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Гарантированная безопасность</h3>
              <p className="text-sm text-muted-foreground">Все операции защищены банковскими стандартами безопасности</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Clock" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-sm text-muted-foreground">Получите банковскую гарантию в кратчайшие сроки</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Icon name="Users" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-semibold mb-2">Персональный менеджер</h3>
              <p className="text-sm text-muted-foreground">Индивидуальное сопровождение на всех этапах</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-12 animate-fade-in">
          <CardHeader>
            <CardTitle>Преимущества банковских гарантий</CardTitle>
            <CardDescription>
              Банковская гарантия — это надежный инструмент для участия в тендерах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="CheckCircle" className="mr-2 text-green-600" size={20} />
                  Высокая надежность
                </h4>
                <p className="text-sm text-muted-foreground">Банковская гарантия обеспечивает выполнение обязательств</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="TrendingUp" className="mr-2 text-blue-600" size={20} />
                  Конкурентное преимущество
                </h4>
                <p className="text-sm text-muted-foreground">Увеличивает шансы на победу в тендере</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="DollarSign" className="mr-2 text-green-600" size={20} />
                  Экономия средств
                </h4>
                <p className="text-sm text-muted-foreground">Не нужно замораживать собственные средства</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Icon name="FileCheck" className="mr-2 text-blue-600" size={20} />
                  Юридическая защита
                </h4>
                <p className="text-sm text-muted-foreground">Соответствие всем требованиям законодательства</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index