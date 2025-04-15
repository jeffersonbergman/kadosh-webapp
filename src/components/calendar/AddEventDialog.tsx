
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";
import { Event } from '@/types/calendar';
import { toast } from "sonner";

interface AddEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedDate,
  onAddEvent
}) => {
  const { t } = useTranslation();
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    description: '',
    type: 'service' as const
  });

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title || !newEvent.time) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    onAddEvent({
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time,
      description: newEvent.description,
      type: newEvent.type
    });

    // Reset form
    setNewEvent({
      title: '',
      time: '',
      description: '',
      type: 'service'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Evento</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do evento abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-date" className="text-right">
              Data
            </Label>
            <div className="col-span-3">
              {selectedDate ? (
                <div className="flex items-center gap-2 h-10 px-3 rounded-md border">
                  <CalendarIcon size={16} className="text-gray-500" />
                  <span>{format(selectedDate, 'dd/MM/yyyy')}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Selecione uma data no calendário</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-title" className="text-right">
              Título
            </Label>
            <Input
              id="event-title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="col-span-3"
              placeholder="Ex: Culto de Adoração"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-time" className="text-right">
              Horário
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <Input
                id="event-time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                placeholder="Ex: 19:00"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-type" className="text-right">
              Tipo
            </Label>
            <Select 
              value={newEvent.type} 
              onValueChange={(value: 'service' | 'meeting' | 'special' | 'other') => 
                setNewEvent({...newEvent, type: value})
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo de evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service">Culto</SelectItem>
                <SelectItem value="meeting">Reunião</SelectItem>
                <SelectItem value="special">Especial</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="event-description" className="text-right pt-2">
              Descrição
            </Label>
            <Textarea
              id="event-description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              className="col-span-3"
              placeholder="Descrição do evento..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddEvent}>Adicionar Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
