import React, {ChangeEvent, FC, useCallback, useRef} from "react";
import './WidgetList.css';
import {WidgetWrapperProps} from "../widgetWrapper/WidgetWrapper";

export interface WidgetOfList {
  Widget: FC<WidgetWrapperProps>;
  id: string;
  currency?: string;
}

interface Props {
  widgetsOfList: WidgetOfList[];
  removeWidget: (id: WidgetOfList['id']) => void;
  moveWidget: (id: WidgetOfList['id'], toColumn: number, currency?: string) => void;
  columnNumber: number;
}

export const WidgetList: FC<Props> = ({widgetsOfList, removeWidget, moveWidget, columnNumber}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const moveHandler = useCallback(
    (index: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const currency = wrapperRef.current?.children[index].querySelector('select')?.value
      moveWidget(widgetsOfList[index].id, parseInt(e.target.value), currency);
    },
    [moveWidget, widgetsOfList]
  );

  return (
    <div ref={wrapperRef}>
      {widgetsOfList.map(({Widget, id, currency}, index) => (
        <div className="widget-item" key={id}>
          <Widget currency={currency}/>
          <select
            onChange={moveHandler(index)}
            defaultValue=""
            className="select select__widget-item"
          >
            <option disabled value="">Переместить виждет</option>
            {columnNumber !== 0 && <option value="0">1 колонка</option>}
            {columnNumber !== 1 && <option value="1">2 колонка</option>}
            {columnNumber !== 2 && <option value="2">3 колонка</option>}
          </select>
          <button onClick={() => removeWidget(id)} className="button button__widget-item">Удалить виджет</button>
        </div>)
      )}
    </div>
  )
}