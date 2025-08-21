import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface YandexFormModalProps {
  children: React.ReactNode;
}

const YandexFormModal = ({ children }: YandexFormModalProps) => {
  const [formUrl, setFormUrl] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  const handleSubmit = () => {
    if (formUrl.includes('forms.yandex.ru')) {
      window.open(formUrl, '_blank');
    } else {
      alert('Пожалуйста, сначала настройте Яндекс.Форму по инструкции ниже');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Mail" className="text-blue-600" />
            Подача заявки через Яндекс.Формы
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {showInstructions ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">📋 Настройка Яндекс.Формы</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>Перейдите на <a href="https://forms.yandex.ru" target="_blank" className="text-blue-600 underline">forms.yandex.ru</a></li>
                  <li>Создайте новую форму "Банковская гарантия"</li>
                  <li>Добавьте поля:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>Название организации (текст)</li>
                      <li>Сумма гарантии (число)</li>
                      <li>Контактное лицо (текст)</li>
                      <li>Телефон (текст)</li>
                      <li>Email (email)</li>
                      <li>Загрузка документов (файл)</li>
                      <li>Комментарий (длинный текст)</li>
                    </ul>
                  </li>
                  <li>В настройках уведомлений укажите свою почту</li>
                  <li>Опубликуйте форму и скопируйте ссылку</li>
                  <li>Вставьте ссылку в поле ниже</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="form-url">Ссылка на Яндекс.Форму</Label>
                <Input
                  id="form-url"
                  placeholder="https://forms.yandex.ru/u/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowInstructions(false)}
                  className="flex-1"
                  disabled={!formUrl}
                >
                  Готово, перейти к заявке
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://forms.yandex.ru', '_blank')}
                >
                  <Icon name="ExternalLink" size={16} />
                  Создать форму
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Icon name="CheckCircle" size={20} />
                  <span className="font-semibold">Форма настроена!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Заявка будет отправлена через Яндекс.Форму на вашу почту
                </p>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                size="lg"
              >
                <Icon name="Send" className="mr-2" />
                Подать заявку
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowInstructions(true)}
                className="w-full"
              >
                Изменить настройки
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YandexFormModal;