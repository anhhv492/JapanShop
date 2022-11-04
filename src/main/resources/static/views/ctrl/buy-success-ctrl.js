const app = angular.module('app-buy', ['ngRoute']);
app.controller('buy-success-ctrl',function($scope,$window,$timeout){
    $scope.show=function () {
        let timerInterval
        Swal.fire({
            title: 'Vui lòng chờ trong giây lát!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    title: 'Thanh toán thành công!',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/accommodation/1.jpg")
                        left top
                        no-repeat
                     `
                })
                localStorage.clear();
                console.log('Buy cart Paypal success!')
            }
        })

        $timeout(function () {
            $window.location.href = 'http://localhost:8080/views/index.html#!/home/index';
        }, 5500);
    }
    $scope.show()
})