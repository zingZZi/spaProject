import Render404 from './pages/render404.js';

class Router {
    constructor() {
        // 라우트들을 저장할 객체
        this.routes = {};
        this.currentRoute = '';
        
        // URL 변경 감지 (해시 기반)
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
        
        // 브라우저 뒤로가기/앞으로가기 감지
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // 페이지 내 링크 클릭 감지 (동적으로 생성된 링크도 포함)
        document.addEventListener('click', (e) => {
            // data-link 속성이 있는 링크 클릭시 SPA 방식으로 처리
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigateTo(href);
            }
        });
    }
    
    /**
     * 라우트 등록
     */
    addRoute(path, handler) {
        this.routes[path] = handler;
        console.log(`라우트 등록: ${path}`);
    }
    
    /**
     * 프로그래밍 방식으로 페이지 이동
     */
    navigateTo(path) {
        // #이 없으면 추가
        if (!path.startsWith('#')) {
            path = '#' + path;
        }
        
        // URL 변경 (주소창에 반영)
        window.location.hash = path;
        
        // 라우트 처리 (hashchange 이벤트가 발생하지만 수동으로도 호출)
        this.handleRoute();
    }
    
    /**
     * 현재 URL 기반으로 해당 페이지 렌더링
     */
    handleRoute() {
        const path = this.getCurrentPath();
        this.currentRoute = path;
        
        console.log(`현재 경로: ${path}`);
        
        // 매칭되는 라우트 찾기
        const route = this.matchRoute(path);
        
        if (route) {
            // 라우트 함수 실행
            route.handler(route.params);
        } else {
            // 404 처리
            Render404();
        }
    }
    
    /**
     * 현재 URL 경로 가져오기
     */
    getCurrentPath() {
        const hash = window.location.hash;
        
        if (hash && hash.startsWith('#')) {
            return hash.slice(1) || '/';
        }
        
        return '/';
    }
    
    /**
     * 라우트 매칭 로직
     */
    matchRoute(path) {
        // 1. 정확한 매칭부터 확인
        if (this.routes[path]) {
            return {
                handler: this.routes[path],
                params: {}
            };
        }
        
        // 2. 동적 라우트 확인 (/products/:id 형태)
        for (const routePath in this.routes) {
            if (routePath.includes(':')) {
                const match = this.matchDynamicRoute(routePath, path);
                if (match) {
                    return {
                        handler: this.routes[routePath],
                        params: match.params
                    };
                }
            }
        }
        
        return null;
    }
    
    /**
     * 동적 라우트 매칭 (/products/:id와 /products/123 비교)
     */
    matchDynamicRoute(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const pathParts = currentPath.split('/');
        
        // 길이가 다르면 매칭 실패
        if (routeParts.length !== pathParts.length) {
            return null;
        }
        
        const params = {};
        
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const pathPart = pathParts[i];
            
            if (routePart.startsWith(':')) {
                // 동적 파라미터 추출
                const paramName = routePart.slice(1);
                params[paramName] = pathPart;
            } else if (routePart !== pathPart) {
                // 고정 부분이 다르면 매칭 실패
                return null;
            }
        }
        
        return { params };
    }
    
    /**
     * 라우터 시작 (앱 로드시 호출)
     */
    start() {
        console.log('라우터 시작됨');
        
        // 초기 로드시 현재 URL 확인하여 해당 페이지 렌더링
        this.handleRoute();
    }
    
    /**
     * 현재 라우트 정보 반환
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    /**
     * 쿼리 파라미터 파싱 (?name=value&age=20)
     */
    getQueryParams() {
        const params = {};
        const queryString = window.location.search.slice(1);
        
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            });
        }
        
        return params;
    }
    
    /**
     * URL에 쿼리 파라미터 추가
     */
    navigateToWithQuery(path, queryParams = {}) {
        let url = path;
        
        const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
            
        if (queryString) {
            url += `?${queryString}`;
        }
        
        this.navigateTo(url);
    }
}

// 전역에서 사용할 수 있도록 export 또는 window에 할당
// ES6 모듈을 사용하는 경우
export default Router;

// 또는 전역 변수로 사용하는 경우 (아래 주석 해제)
// window.Router = Router;