import React from 'react'
import mirror, { actions, connect, render } from 'mirrorx'

// 声明 Redux state, reducer 和 action，
// 所有的 action 都会以相同名称赋值到全局的 actions 对象上，actions.[name]即可取到所有的action
mirror.model({
    name: 'app',//相当于reducerName
    initialState: 0,//初始化state
    reducers: {//reducer事件处理，这里省略了action的type，type为[name]/[methodName]
        increment(state) { return state + 1 },
        decrement(state) { return state - 1 }
    },
    effects: {//异步方法声明,异步操作需要在完成后再调用reducers定义的同步方法才能进行页面渲染
        async incrementAsync() {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })
            actions.app.increment()//actions会自动dispatch对应的action
        }
    }
})

const App = (props) => {//组件定义
    return (
        <div>
            <h1>{props.count}</h1>
            {/* 调用 actions 上的方法来 dispatch action */}
            <button onClick={() => actions.app.decrement()} style={{margin:"5px"}}>-</button>
            <button onClick={() => actions.app.increment()} style={{margin:"5px"}}>+</button>
            {/* dispatch async action */}
            <button onClick={() => actions.app.incrementAsync()} style={{margin:"5px"}}>+ Async</button>
        </div>
    )
}



export default connect((state) => {//连接组件和状态管理
    return {
        count: state.app
    }
})(App)
