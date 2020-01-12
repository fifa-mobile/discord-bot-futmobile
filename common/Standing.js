class Standing {
  constructor(name) {
    this.name = name;
    this.P = 0;
    this.W = 0;
    this.D = 0;
    this.L = 0;
    this.Pts = 0;
    this.GS = 0;
    this.GA = 0;
    this.GD = 0;
  }

  add(gs, ga) {
    this.P++;
    if(gs > ga) {
      this.W++;
      this.Pts += 3;
    }
    if(gs < ga) {
      this.L++;
    }
    if(gs === ga) {
      this.D++;
      this.Pts += 1;
    }
    this.GS += gs;
    this.GA += ga;
    this.GD = this.GS - this.GA;
  }
};

module.exports =  player => new Standing(player);
