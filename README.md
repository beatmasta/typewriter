typewriter
=============

Type writing effect library for jQuery.

Usage
=====
```html
<script type="text/javascript">
    $(document).ready(function() {
        $("div#my-typewriter").typeWriter({
			startDelay: 100,   // type: integer | time in milliseconds to delay before starting the animation
			typeRowDelay: 100, // type: integer | pause milliseconds after typing each row
			typeDelay: 100,    // type: integer | this is delay to type each single character
			rowComplete: null, // type: function | one row typing complete callback
			complete: null     // type: function | full typing complete callback
		});
    });
</script>
<div id="my-typewriter">
    this is the first line
	test line 2
	test line 3
</div>
```

API Methods
=======

More to be added soon....