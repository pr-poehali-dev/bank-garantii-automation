import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

interface DocumentRequirementsProps {
  uploadedFiles: File[]
  onDocumentUpload: (file: File) => void
  onRemoveFile: (index: number) => void
  onSubmitApplication: () => void
  isSubmitting: boolean
}

const DocumentRequirements = ({ 
  uploadedFiles, 
  onDocumentUpload, 
  onRemoveFile, 
  onSubmitApplication, 
  isSubmitting 
}: DocumentRequirementsProps) => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="FileText" className="text-primary" />
          <span>Перечень документов</span>
        </CardTitle>
        <CardDescription>
          Перечень необходимых документов для ООО:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Реестровый № торгов/ссылка на закупку</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Бух. Бал. по Ф1 и Ф2 за 2024г. (в скане с квитанцией о приеме и о вводе сведений)</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Бух. Бал. по Ф1 и Ф2 за 2 кв. 2025г. (промежуточный, в скане с подписью, печатью организации) – только если сможете сформировать</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">4</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Действующий договор аренды/собственности помещения</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">5</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Паспорта руководителей и учредителей (все страницы, включая пустые), доля которых равна или свыше 5%</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">6</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Карточка с реквизитами организации (желательно в word формате)</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">7</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Устав</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">8</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">Приказ + решение о назначении генерального директора</p>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-primary hover:text-primary/80">
                  <Icon name="Paperclip" size={16} />
                  <span>Прикрепить файл</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onDocumentUpload(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="font-medium">Загруженные документы:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="FileCheck" className="text-green-600" size={16} />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button 
            className="w-full max-w-md mx-auto" 
            size="lg" 
            id="submit-application"
            onClick={onSubmitApplication}
            disabled={isSubmitting}
          >
            <Icon name="Send" className="mr-2" size={20} />
            {isSubmitting ? 'Отправка...' : 'Подать заявку'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DocumentRequirements