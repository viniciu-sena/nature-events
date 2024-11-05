import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/not-found.png';

export default function NotFound() {
  return (
    <article className="flex flex-col items-center justify-center">
      <img src={notFound} alt="Não encontrado" className="m-auto h-[60vh]" />
      <Link
        to="/"
        className="text-lg font-semibold hover:underline flex items-center gap-2"
      >
        <ArrowLeft size={24} />
        <span>Voltar a página principal</span>
      </Link>
    </article>
  );
}
