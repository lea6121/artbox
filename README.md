# ArtBox

### 簡介

以 React, Firebase 及使用 fetch 串接 Open Source API 搭建之博物館網站，旨在陳列館藏、提供館藏查詢和博物館周邊商品販售。使用者身份可為訪客和會員。
**_[DEMO 網址請點](https://lea6121.github.io/artbox/#/)_**

### 主要頁面和功能

#### 首頁

- 陳列網站提供的服務，包括關於、館藏搜尋、商店等
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/index.gif?raw=true)

#### 關於

- 簡易介紹博物館

#### 館藏頁面

- 館藏搜尋功能
- 分類標籤，使用者可點選標籤來取得分類後的館藏內容
- 分頁功能（一頁顯示 24 筆館藏之圖片、名稱和創作者）
- 點選特定館藏之圖片文字可查看該館藏的詳細資訊
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/collections.gif?raw=true)

#### 單一館藏頁面

- 顯示單一館藏詳細資訊

#### 商店頁面

- 陳列所有商品圖片、名稱和價格，商品依類別呈現。
- Hover 商品時會出現加入購物車、查看商品、加入/移除最愛按鈕（若使用者非登入狀態會到登入頁面）
- 點選特定商品可查看該商品的詳細資訊
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/shop.gif?raw=true)

#### 單一類別商品頁面

- 呈現該類所有商品之圖片、名稱、價格
- Hover 商品時會出現加入購物車、查看商品、加入/移除最愛按鈕（若使用者非登入狀態會到登入頁面）
- 點選特定商品可查看該商品的詳細資訊

#### 單一商品頁面

- 呈現該商品之圖片和詳細內容
- 可查看一張以上的商品圖片
- 可選取商品數量、規格，並加入購物車
- 可將商品加入/移除我的最愛，若使用者為非登入狀態則會到登入頁面
- 下方會隨機出現推薦使用者的四個同分類商品

#### 購物車頁面

- 陳列已加入購物車的商品
- 使用 Local Storage
- 可移除商品
- 點選結帳按鈕可到結帳頁面，若使用者為非登入狀態則會到登入頁面
- 若購物車沒有任何商品無法到結帳頁面
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/cart.gif?raw=true)

#### 登入頁面

- 提供使用者以 google 或一般 email 方式登入
- 若未註冊可點選 sign up 到註冊頁面
- Email 和密碼格式驗證，並將錯誤訊息呈現給使用者
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/login.gif?raw=true)

#### 註冊頁面

- 提供使用者以一般 email 或 google 帳號註冊
- Email 和密碼格式驗證，並將錯誤訊息呈現給使用者
  **如不欲註冊可使用測試帳號登入使用**
  Email: demo@gmail.com
  Password: demo1234
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/register.gif?raw=true)

#### 結帳頁面

- 使用者可於此頁面修改商品數量、規格，和計算總價格
- 若商品項目在本頁面皆被刪除（即沒有商品項目可結帳），而使用者點選結帳按鈕則會回到商店頁面
- 若確定有商品並點選結帳按鈕則會切換為填寫資料（購買人名稱、email、聯絡資料、配送地址等）表格
- 表格填寫完畢並驗證無誤後，會切換為確認資料畫面，該頁面會呈現欲購買商品及表格填寫的資料。若使用者想修改內容可按上一步回到表格，或回到確認商品項目畫面。確認無誤按下提交則訂單送出，會顯示訂購成功畫面
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/checkout.gif?raw=true)

#### 我的最愛頁面（需使用者登入才可查看和使用之功能）

- 陳列使用者的最愛商品
- 點選商品圖片可到該商品頁面
- 可刪除我的最愛商品
  ![](https://github.com/lea6121/img-storage/blob/main/gifs/myfavorite.gif?raw=true)

#### 我的訂單頁面（需使用者登入才可查看之頁面）

- 供使用者查看歷史訂單
- 顯示各訂單日期、編號、總價格、付款方式、出貨進度和該筆訂單明細

### 使用技術

---

- React
- React Router
- Redux Toolkit
- @emotion/css
- RWD
- Local Storage
- gh-pages
- fetch API
- Firebase

### 聲明

---

網站包含之圖片與內容僅供各然專案使用，不作任何商業用途。
