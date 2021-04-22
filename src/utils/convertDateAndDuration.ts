import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function convertDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration% 60;
  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');
  return timeString;
}

export function convertDate(publishDate: string) {
  const getDate = format(parseISO(publishDate), 'd MMM yy', { locale: ptBR });
  return getDate;
}
