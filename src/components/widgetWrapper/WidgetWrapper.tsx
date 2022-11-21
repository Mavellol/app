import {ChangeEvent, FC, useEffect,   useRef, useState} from "react";
import './WidgetWrapper.css';

export interface WidgetWrapperProps {
  currency?: string;
}

export const WidgetWrapper: FC<WidgetWrapperProps> = ({currency}) => {
  const [currentCurrency, setCurrentCurrency] = useState(currency);
  const [isReady, setIsReady] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    currentCurrency && isReady && iframeRef.current?.contentWindow?.postMessage(currentCurrency, '*');
  }, [currentCurrency, isReady]);

  return (
    <div className="widget-wrapper">
      <iframe
        className="widget-wrapper__iframe"
        ref={iframeRef} src="http://127.0.0.1:8080"
        title="title"
        onLoad={() => setIsReady(true)}
        style={{height: '100px'}}
      />
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrentCurrency(e.target.value)}
        defaultValue={currentCurrency || ""}
        className="select"
      >
        <option disabled value="">Выберите валюту</option>
        <option value="USD">Доллар США</option>
        <option value="EUR">Евро</option>
        <option value="CNY">Китайский юань</option>
        <option value="JPY">Японская иена</option>
        <option value="CHF">Швейцарский франк</option>
        <option value="CAD">Канадский доллар</option>
        <option value="BCH">Биткойн Кэш</option>
        <option value="BTC">Биткойн</option>
        <option value="ETH">Эфириум</option>
        <option value="XRP">Криптовалюта XRP</option>
        <option value="BYN">Белорусский рубль</option>
        <option value="GBP">Фунт стерлингов</option>
        <option value="GEL">Грузинский лари</option>
        <option value="LKR">Шри-ланкийская рупия</option>
        <option value="MDL">Молдавский лей</option>
        <option value="MMK">Мьянманский кьят</option>
        <option value="RSD">Сербский динар</option>
        <option value="THB">Тайский бат</option>
      </select>
    </div>
  )
}