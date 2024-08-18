import { useEffect } from "react";
import MainLayout from "./layout/MainLayout"
import { useAppSelector } from "./redux/hooks";

function App() {

  const { products } = useAppSelector((state) => state.product)

  useEffect(() => {
    if(products.length > 0){
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleBeforeUnload = (event:any) => {
        event.preventDefault();
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [products]);
  return (
    <>
      <MainLayout />
    </>
  )
}

export default App
