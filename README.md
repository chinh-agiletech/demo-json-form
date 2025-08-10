# Dynamic Form System

Hệ thống form động được xây dựng với React, cho phép tạo và tùy chỉnh các form thông qua cấu hình JSON schema.

## Cài đặt và chạy

### `npm install`
Cài đặt các dependencies cần thiết.

### `npm start`
Chạy ứng dụng ở chế độ development.\
Mở [http://localhost:3000](http://localhost:3000) để xem trong browser.

## Hướng dẫn Custom Form

### Tạo Schema mới

Tạo file schema trong `src/schemas/`, ví dụ `phoneInput.json`:

```json
{
    "dataSchema": {
        "type": "object",
        "properties": {
            "value": { "type": "string" }
        },
        "required": ["value"]
    },
    "uiSchema": {
        "type": "Control",
        "inputType": "tel",
        "validation": {
            "required": true,
            "pattern": "^[0-9]{10,11}$"
        },
        "styling": {
            "width": "100%",
            "padding": "12px",
            "border": "1px solid #ddd",
            "borderRadius": "6px",
            "fontSize": "16px"
        },
        "labelStyle": {
            "display": "block",
            "marginBottom": "8px",
            "fontWeight": "bold",
            "color": "#333",
            "fontSize": "14px",
            "textAlign": "left"
        },
        "placeholder": "Nhập số điện thoại"
    }
}
```

## Cấu hình Schema

### uiSchema - Các thuộc tính chính:
- `inputType`: text, email, password, tel, number, date
- `validation`: 
  - `required`: true/false
  - `minLength/maxLength`: Độ dài
  - `pattern`: Regex
  - `minimum/maximum`: Giá trị min/max (số)
- `styling`: CSS cho input
- `labelStyle`: CSS cho label
- `placeholder`: Placeholder text

### Validation Examples:

**Text Input:**
```json
"validation": {
  "required": true,
  "minLength": 3,
  "maxLength": 50
}
```

**Email Input:**
```json
"validation": {
  "required": true,
  "format": "email"
}
```

**Number Input:**
```json
"validation": {
  "required": true,
  "minimum": 18,
  "maximum": 100
}
```

**Pattern Validation:**
```json
"validation": {
  "required": true,
  "pattern": "^[0-9]{10,11}$"
}
```

## Các Scripts khác

### `npm test`

Chạy test runner ở chế độ interactive watch mode.\
Xem thêm về [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Build ứng dụng cho production vào thư mục `build`.\
Tối ưu hóa và minify code để có performance tốt nhất.

## Tài liệu tham khảo

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [JSON Schema](https://json-schema.org/)
