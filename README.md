## INSTALL

```bash
vue add mockjs-server
```

## CONFIG

Modify `vue.config.js`:

```javascript
pluginOptions: {
    mockjs: {
        path: path.join(__dirname, './mock'),
        debug: true,
        port: 3000
    }
}
```

## MOCK FILE

- create `json` file in `mock` folder 
- create `js` file in `mock` folder

```json
/**
 *  Show favourite user @url /user/love
 */
{
    "code": 0,
    "result|5": [
      {
        "id|+1": 1,
        "name": "@name",
        "email": "@email"
      }
    ]
  }
```

```js
/**
 * 用户登入 @url /user/login
 */
module.exports = () => {
    return {
        code: '200',
        data: {
            userName: '@cname()',
            // Token值
            tokenValue: '@guid()',
        }
```

## PREVIEW
- Visit [http://localhost:3000](http://localhost:3000) to see the mock dashboard
- Visit [http://localhost:3000/user/love](http://localhost:3000/user/love)  to see the mocked JSON result
- Visit [http://localhost:3000/user/login](http://localhost:3000/user/login) to see the mocked JSON result


## ACKNOWLEDGEMENT

Most of the codes are from [@soon08](https://github.com/soon08/mockjs-webpack-plugin).