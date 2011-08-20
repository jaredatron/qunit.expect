!function(){

  test('expect', 1, function(){
    equals(typeof expect, 'function');
  });

  test('toEqual', 4, function(){
    expect(1  ).toEqual(1);
    expect(1  ).toEqual('1');
    expect('1').toEqual(1);
    expect('1').toEqual('1');
  });

  test('toNotEqual', 4, function(){
    expect(2  ).toNotEqual(1);
    expect(2  ).toNotEqual('1');
    expect('2').toNotEqual(1);
    expect('2').toNotEqual('1');
  });

  test('toBe', 2, function(){
    expect(1).toBe(1);
    expect(window).toBe(window);
  });

  test('toNotBe', 1, function(){
    expect({}).toNotBe({});
  });

  test('toBeA', 5, function(){
    expect(undefined   ).toBeA('undefined');
    expect({}          ).toBeAn('object');
    expect('hello'     ).toBeA('string');
    expect(1           ).toBeA('number');
    expect(function(){}).toBeA('function');
  });

  test('toNotBeA', 6, function(){
    expect(1        ).toNotBeA('undefined');
    expect(1        ).toNotBeA('undefined');
    expect(undefined).toNotBeAn('object');
    expect(undefined).toNotBeA('string');
    expect(undefined).toNotBeA('number');
    expect(undefined).toNotBeA('function');
  });

  test('toBeAnInstanceOf', 7, function(){
    expect({}          ).toBeAnInstanceOf(Object);
    expect([]          ).toBeAnInstanceOf(Array);
    expect(function(){}).toBeAnInstanceOf(Function);
    expect(new Number  ).toBeAnInstanceOf(Number);
    expect(new Error   ).toBeAnInstanceOf(Error);
    expect(new Number  ).toBeAnInstanceOf(Number.prototype);
    expect(new Error   ).toBeAnInstanceOf(Error.prototype);
  });

  test('toNotBeAnInstanceOf', 7, function(){
    expect(undefined   ).toNotBeAnInstanceOf(Object);
    expect({}          ).toNotBeAnInstanceOf(Array);
    expect([]          ).toNotBeAnInstanceOf(Function);
    expect(function(){}).toNotBeAnInstanceOf(Number);
    expect(new Number  ).toNotBeAnInstanceOf(Error);
    expect(new Number  ).toNotBeAnInstanceOf({});
    expect(new Error   ).toNotBeAnInstanceOf({});
  });

  test('toDeepEqual', 4, function(){
    expect({}).toDeepEqual({});
    expect({a:{b:{c:1}}}).toDeepEqual({a:{b:{c:1}}});
    expect([]).toDeepEqual([]);
    expect([1,[2,[3,[4]]]]).toDeepEqual([1,[2,[3,[4]]]]);
  });

  test('toNotDeepEqual', 4, function(){
    expect({}).toNotDeepEqual([]);
    expect({a:{b:{c:1}}}).toNotDeepEqual({a:{b:{c:2}}});
    expect([]).toNotDeepEqual({});
    expect([1,[2,[3,[4]]]]).toNotDeepEqual([1,[2,[3,[5]]]]);
  });

  test('toThrowAnError', 1, function(){
    expect(function(){ throw 'z'; }).toThrowAnError();
  });

  test('toNotThrowAnError', 1, function(){
    expect(function(){ }).toNotThrowAnError();
  });

  test('toThrow', 1, function(){
    expect(function(){ throw 'test error'; }).toThrow('test error');
  });

  test('toNotThrow', 1, function(){
    expect(function(){ }).toNotThrow('text error');
  });

  test('toThrowA', 5, function(){
    expect(function(){ throw undefined;    }).toThrowA('undefined');
    expect(function(){ throw {};           }).toThrowAn('object');
    expect(function(){ throw '';           }).toThrowA('string');
    expect(function(){ throw 5;            }).toThrowA('number');
    expect(function(){ throw function(){}; }).toThrowA('function');
  });

  test('toNotThrowA', 5, function(){
    expect(function(){ throw {};           }).toNotThrowA('undefined');
    expect(function(){ throw '';           }).toNotThrowAn('object');
    expect(function(){ throw 5;            }).toNotThrowA('string');
    expect(function(){ throw function(){}; }).toNotThrowA('number');
    expect(function(){ throw undefined;    }).toNotThrowA('function');
  });

  test('toThrowAnInstanceOf', 5, function(){
    expect(function(){ throw {};           }).toThrowAnInstanceOf(Object);
    expect(function(){ throw [];           }).toThrowAnInstanceOf(Array);
    expect(function(){ throw function(){}; }).toThrowAnInstanceOf(Function);
    expect(function(){ throw new Number;   }).toThrowAnInstanceOf(Number);
    expect(function(){ throw new Error;    }).toThrowAnInstanceOf(Error);
  });

  test('toNotThrowAnInstanceOf', 5, function(){
    expect(function(){ throw undefined;    }).toNotThrowAnInstanceOf(Object);
    expect(function(){ throw function(){}; }).toNotThrowAnInstanceOf(Array);
    expect(function(){ throw new Number;   }).toNotThrowAnInstanceOf(Function);
    expect(function(){ throw new Error;    }).toNotThrowAnInstanceOf(Number);
    expect(function(){ throw {};           }).toNotThrowAnInstanceOf(Error);
  });

  test('toHaveProperty', function(){
    expect({a:1}).toHaveProperty('a');
  });

  test('toNotHaveProperty', function(){
    expect({b:1}).toNotHaveProperty('a');
  });

  test('multiple objects', 60, function(){
    expect(1,1,1                         ).toEqual(1);
    expect(2,3,4                         ).toNotEqual(1);
    expect(expect,expect,expect          ).toBe(expect);
    expect({},[],1                       ).toNotBe({});
    expect('a','b','c'                   ).toBeA('string');
    expect(1,1,1                         ).toNotBeA('string');
    expect([1],[2],[3]                   ).toBeAnInstanceOf(Array);
    expect([1],[2],[3]                   ).toNotBeAnInstanceOf(Error);
    expect({a:[1]}, {a:[1]}, {a:[1]}     ).toDeepEqual({a:[1]});
    expect({a:[1]}, {a:[1]}, {a:[1]}     ).toNotDeepEqual({a:[2]});
    expect({a:1,b:2},{a:3,c:4},{a:5,d:6} ).toHaveProperty('a');
    expect({a:1,b:2},{a:3,c:4},{a:5,d:6} ).toNotHaveProperty('z');

    expect(
      function(){ throw 'a'; },
      function(){ throw 'b'; },
      function(){ throw 'c'; }
    ).toThrowAnError();

    expect(
      function(){},
      function(){},
      function(){}
    ).toNotThrowAnError();

    expect(
      function(){ throw 'frog'; },
      function(){ throw 'frog'; },
      function(){ throw 'frog'; }
    ).toThrow('frog');

    expect(
      function(){ throw 'pig';  },
      function(){ throw 'cow';  },
      function(){ throw 'fish'; }
    ).toNotThrow('frog');

    expect(
      function(){ throw 1; },
      function(){ throw 2; },
      function(){ throw 3; }
    ).toThrowA('number');

    expect(
      function(){ throw 1; },
      function(){ throw 2; },
      function(){ throw 3; }
    ).toNotThrowA('string');

    expect(
      function(){ throw [1]; },
      function(){ throw [2]; },
      function(){ throw [3]; }
    ).toThrowAnInstanceOf(Array);

    expect(
      function(){ throw [1]; },
      function(){ throw [2]; },
      function(){ throw [3]; }
    ).toNotThrowAnInstanceOf(Error);

  });

}();
