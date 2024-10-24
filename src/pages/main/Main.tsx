import { PaperPlaneRight } from '@phosphor-icons/react';
import { memo, useMemo } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useMain } from './useMain';

function Main() {
  const { location } = useMain();

  const render = useMemo(() => {
    if (location === null) {
      return (
        <div className="w-full h-fit grid grid-cols-1 items-center place-items-center p-8 gap-4">
          <label className="text-xl">Informe a sua cidade para continuar</label>
          <div className="w-1/2 flex justify-center items-center gap-4">
            <Input className="focus:border-none" />
            <Button variant="ghost">
              <PaperPlaneRight weight="fill" size={60} />
            </Button>
          </div>
        </div>
      );
    }
    return <h1>Hello World</h1>;
  }, [location]);

  return render;
}

export default memo(Main);
