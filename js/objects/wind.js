define(
  function () {

    function Wind ( context ) {
      this.context = context;
      this.canvas = document.getElementById('canvas');
      this.windSpeed = Math.floor( Math.random() * 10 - 5 );
      if ( Math.floor( Math.random() * 3 ) === 1 ) {
        if ( this.windSpeed > 0 ) {
          this.windSpeed += Math.floor( Math.random() * 10 );
        } else {
          this.windSpeed -= Math.floor( Math.random() * 10 );
        }
      }
    }

    /**
     * create: Build out the Wind display
     */
    Wind.prototype.create = function () {
      if ( this.windSpeed !== 0 ) {
        this.windLine = this.windSpeed * 10 * ( this.canvas.width / 320 );
        this.context.strokeStyle = 'rgb( 255, 255, 0 )';
        this.context.beginPath();
        this.context.moveTo( this.canvas.width / 2, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        if ( this.windSpeed > 0 ) {
          this.arrowDir = -2;
        } else {
          this.arrowDir = 2;
        }
        this.context.moveTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine + this.arrowDir, this.canvas.height - 5 - 2 );
        this.context.moveTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine + this.arrowDir, this.canvas.height - 5 + 2 );
        this.context.stroke();
      }
      document.getElementById('current_wind').innerHTML = this.windSpeed;
    };

    return Wind;
});
