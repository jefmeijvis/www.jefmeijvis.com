<script lang="ts">
    let postCount = 23;

    function getPostRate() : number
	{
		let date_1 = new Date('10/16/2021');
		let date_2 = new Date();

		let difference = Math.abs(date_1.getTime() - date_2.getTime());
		let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

		let daysBetweenPosts =  Math.ceil(TotalDays / postCount);
		return daysBetweenPosts;
	}
</script>

<h1>Blog</h1>

<p>
    I've been using this blog to share my thoughts since October 2021.
	Topics are always IT related, floating somewhere between frontend development, cloud infrastructure and cybersecurity.
    Because this website and its statistics are updated daily, I'm able to give you some numbers here:
	So far I have written {postCount} posts. 
	That means that on average, I write a post every {getPostRate()} days! 
</p>

<style>
    h1
    {
        font-size: 3rem;
        text-align: center;
        margin:3rem;
    }

    p
    {
        color:var(--color-text-dark);
        text-align: justify;
    }
</style>