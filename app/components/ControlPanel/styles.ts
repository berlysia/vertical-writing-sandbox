import { css } from 'hono/css'

// フローティングコントロールパネル（Dialog要素）
export const controlPanelClass = css`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  min-width: 280px;
  max-width: 90vw;

  margin-block-end: 20px;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: calc(100vw - 40px);
  }
`

export const panelTitleClass = css`
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
`

export const controlGroupClass = css`
  margin-bottom: 15px;
`

export const controlLabelClass = css`
  display: block;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 600;
`

export const toggleBtnClass = css`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }
`

export const controlInputClass = css`
  width: 60%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`

export const controlSelectClass = css`
  width: 30%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`

// 開閉トグルボタン
export const togglePanelBtnClass = css`
  position: fixed;
  bottom: 64px;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: #fefefe;
  border: 2px solid #3498db;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
`
