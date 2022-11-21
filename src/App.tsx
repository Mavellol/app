import React, {useCallback, useState} from 'react';
import './App.css';
import {WidgetWrapper} from "./components/widgetWrapper/WidgetWrapper";
import {WidgetList, WidgetOfList} from "./components/widgetList/WidgetList";

export const uniqueString = (maxLength: number, prefix = '') =>
  `${prefix}_${Math.random().toString(36).substring(2, maxLength + 2)}`;

function App() {
  const [widgets, setWidgets] = useState<Array<WidgetOfList[]>>([[], [], []]);

  const addWidget = useCallback((columnNumber: number) => () => {
    widgets[columnNumber].push({Widget: WidgetWrapper, id: uniqueString(12)});
    setWidgets([...widgets])
  }, [widgets]);

  const removeWidget = useCallback((columnNumber: number) => (widgetId: string) => {
    widgets[columnNumber] = widgets[columnNumber].filter((w) => w.id !== widgetId);
    setWidgets([...widgets])
  }, [widgets]);

  const moveWidget = useCallback((fromColumn: number) => (widgetId: string, toColumn: number, currency?: string) => {
    widgets[fromColumn] = widgets[fromColumn].filter((w) => w.id !== widgetId);
    widgets[toColumn].push({Widget: WidgetWrapper, id: widgetId, currency});
    setWidgets([...widgets])
  }, [widgets]);

  return (
    <div className="container">
      <div className="item">
        <h2>1 колонка</h2>
        <button onClick={addWidget(0)} className="button">Добавить виджет</button>
        <WidgetList
          widgetsOfList={widgets[0]}
          removeWidget={removeWidget(0)}
          moveWidget={moveWidget(0)}
          columnNumber={0}
        />
      </div>
      <div className="item">
        <h2>2 колонка</h2>
        <button onClick={addWidget(1)} className="button">Добавить виджет</button>
        <WidgetList
          widgetsOfList={widgets[1]}
          removeWidget={removeWidget(1)}
          moveWidget={moveWidget(1)}
          columnNumber={1}
        />
      </div>
      <div className="item">
        <h2>3 колонка</h2>
        <button onClick={addWidget(2)} className="button">Добавить виджет</button>
        <WidgetList
          widgetsOfList={widgets[2]}
          removeWidget={removeWidget(2)}
          moveWidget={moveWidget(2)}
          columnNumber={2}
        />
      </div>
    </div>
  );
}

export default App;
