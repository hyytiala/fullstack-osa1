const arto = {
    nimi: 'Arto Hellas',
    tervehdi: function () {
      console.log('hello, my name is', this.nimi)
    },
    laskeSumma: function (a, b) {
      console.log(a + b)
    }
  }
  
  arto.laskeSumma(1, 4)   // tulostuu 5
  
  const viiteSummaan = arto.laskeSumma
  viiteSummaan(10, 15)   // tulostuu 25