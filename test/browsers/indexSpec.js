describe('index', function() {
    it('should have title', function() {
        browser.url('http://127.0.0.1:8080');
        expect(browser.getTitle()).to.have.string(
          'Software Developer Tidbits - Web Development, Programming and Related Aspects.'
        );
    });
});
