var source_data;
var tower_range;
var enemies = [];
var names = [];
var distances = [];
var speeds = [];
var turns = 0;
var timer;

var delete_index =[];
function calc()
{
  	$.get("source.txt", function(data)
  	{
		source_data = data;
		tower_range = parseInt(source_data.split("\n")[0].split("m")[0]);
		var enemy_count = source_data.split("\n").length - 1;

		for(var i = 1 ; i < enemy_count+1;i++)
		{
			enemies.push(source_data.split("\n")[i]);
		}

		for(var i =0;i<enemies.length;i++)
		{
			calc_distance(enemies[i]);
		}

		timer = setInterval("kill()",1000);
	});
}

function kill()
{
	if(enemies.length == 0)
	{
		clearInterval(timer);
		console.log("Win "+ turns+" turns");
	}
	else
	{	
		sort();
		turns ++ ;
		for(var i = 0; i <enemies.length;i++)
		{
			if(distances[i]-speeds[i]<=0)
			{
				clearInterval(timer);
				console.log("Loss "+ turns+" turns");
			}
			else
			{
				if(tower_range >= distances[i]-speeds[i])
				{
					console.log(names[i] + " was killed");
					enemies.splice(delete_index[i], 1);
					names.splice(delete_index[i],1);
				    distances.splice(delete_index[i],1);
				    speeds.splice(delete_index[i],1);
				    break;
				}
			}
		}

		for(var i = 0; i <enemies.length;i++)
		{
			distances[i] = distances[i]-speeds[i];
		}
	}
}
function calc_distance(enemy)
{
	var name = enemy.split(" ")[0];
	var distance = parseInt(enemy.split(" ")[1].split("m")[0]);
	var speed = parseInt(enemy.split(" ")[2].split("m")[0]);

	names.push(name);
	distances.push(distance);
	speeds.push(speed);
}

function sort()
{
	for(var i = 0 ; i < distances.length; i++)
	{
		for(var j = i+1;j<distances.length;j++)
		{
			if(distances[i]>distances[j])
			{
				var temp = distances[i];
				distances[i]=distances[j];
				distances[j]=temp;

				temp = speeds[i];
				speeds[i]=speeds[j];
				speeds[j]=temp;

				temp = names[i];
				names[i]=names[j];
				names[j]=temp;

				temp = enemies[i];
				enemies[i]=enemies[j];
				enemies[j]=temp;
			}
		}
	}
}