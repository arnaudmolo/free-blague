jest.dontMock('../utils/clean-string');
describe('String cleaning', function() {

  var cleanString = require('../utils/clean-string');

  it('should remove multiple "?"', function() {
    expect(cleanString('wat the ???? question?????')).not.toContain('??');
  });

  it('should remove multiple "!"', function() {
    expect(cleanString('wat the !!! question !!!!!!!')).not.toContain('!!');
  });

  it('should remove multiple ","" and be careful of floats', function() {
    expect(cleanString('wat the ,,,, question ,,,,,,')).not.toContain(',,');
 });

  it('should remove space before comma', function() {

  });

  it('should remove multiple spaces', function() {
    expect(cleanString('wat the         question       ')).not.toContain('  ');
  });

  it('should force 3 dots', function() {
    expect(cleanString('What the..')).toContain('...');
    // expect(cleanString('What.. The..')).toBe('What... The...');
    // expect(cleanString('What.... The..')).toBe('What.... The...');
  });

  it('should remove space before dot', function() {
    expect(cleanString('wat the . question .')).not.toContain(' .');
  });

  it('should remove multiple begining or ending spaces', function() {
    expect(cleanString(`wat the


     question



      `)).not.toContain(`
    `);
  });

  it('should remove capital letters', function() {
    expect(cleanString('wat the AAaAaAAAa question AAaAaAAAa')).not.toContain('aA');
  });

  it('should Capitalize first letter', function() {
    expect(cleanString('capitalize me').charAt(0)).toBe('C');
  });

});
